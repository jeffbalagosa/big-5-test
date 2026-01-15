"""Bridge layer that routes scoring calls through the shared Node.js engine.

The React frontend imports the shared library directly. The Python CLI uses this
bridge to invoke `lib/scoring/cli.js` via subprocess, ensuring one source of truth
for scoring logic across both interfaces.
"""

from __future__ import annotations

import json
import subprocess
from pathlib import Path
from typing import Iterable, List, Mapping, Sequence

from modules.models import Item

CLI_PATH = Path(__file__).resolve().parent.parent / "lib" / "scoring" / "cli.js"


class NodeScoringError(RuntimeError):
    """Raised when the Node.js scoring process reports an error."""


def check_nodejs_available() -> bool:
    """Verify that Node.js is available on PATH.

    Raises:
        FileNotFoundError: when the `node` executable is missing.
        RuntimeError: when `node -v` returns a non-zero exit code.
    """

    try:
        subprocess.run(
            ["node", "-v"],
            capture_output=True,
            text=True,
            check=True,
        )
        return True
    except FileNotFoundError as exc:  # pragma: no cover - environment dependent
        raise FileNotFoundError(
            "Node.js is required for scoring. Install it from https://nodejs.org/"
        ) from exc
    except (
        subprocess.CalledProcessError
    ) as exc:  # pragma: no cover - environment dependent
        raise RuntimeError("Node.js is installed but failed to run.") from exc


def _question_payload(questionnaire: Sequence[Item]) -> list[dict]:
    return [
        {
            "id": idx,
            "trait": item.trait,
            "reverse": bool(getattr(item, "reverse", False)),
        }
        for idx, item in enumerate(questionnaire, start=1)
    ]


def _build_answers_map(
    responses: Iterable[int], questions: Sequence[Mapping], max_val: int
) -> dict:
    answers = {}
    for question, response in zip(questions, responses):
        if not isinstance(response, int) or response < 1 or response > max_val:
            raise ValueError(f"Responses must be integers 1-{max_val}.")
        answers[question["id"]] = response
    return answers


def _prepare_scoring_input(
    responses: Iterable[int], questionnaire: Sequence[Item], test_type: str
) -> str:
    if test_type not in {"big5", "mbti"}:
        raise ValueError("test_type must be 'big5' or 'mbti'.")

    responses_list = list(responses)
    if len(responses_list) != len(questionnaire):
        raise ValueError("Number of responses does not match questionnaire length.")

    max_val = 5 if test_type == "big5" else 6
    questions = _question_payload(questionnaire)
    answers = _build_answers_map(responses_list, questions, max_val)

    body = {
        "answers": answers,
        "questions": questions,
        "test_type": test_type,
        "maxVal": max_val,
    }
    return json.dumps(body)


def _invoke_nodejs_scoring(json_input: str) -> subprocess.CompletedProcess:
    try:
        result = subprocess.run(
            ["node", str(CLI_PATH)],
            input=json_input,
            capture_output=True,
            text=True,
            check=False,
        )
    except FileNotFoundError as exc:  # pragma: no cover - environment dependent
        raise FileNotFoundError(
            "Node.js executable not found. Ensure Node.js is installed and in PATH."
        ) from exc

    return result


def _parse_scoring_output(stdout: str) -> dict:
    try:
        payload = json.loads(stdout.strip())
    except json.JSONDecodeError as exc:
        raise NodeScoringError("Invalid JSON returned from scoring process") from exc

    if not payload.get("ok"):
        raise NodeScoringError(payload.get("error", "Unknown scoring error"))

    return payload["scores"]


def _handle_process_result(result: subprocess.CompletedProcess) -> dict:
    if result.returncode != 0:
        message = result.stdout.strip() or result.stderr.strip() or "Scoring failed"
        raise NodeScoringError(message)

    if not result.stdout.strip():
        raise NodeScoringError("Scoring process returned no output.")

    return _parse_scoring_output(result.stdout)


def score_big5_nodejs(responses: Iterable[int], questionnaire: List[Item]) -> dict:
    payload = _prepare_scoring_input(responses, questionnaire, "big5")
    result = _invoke_nodejs_scoring(payload)
    return _handle_process_result(result)


def score_mbti_nodejs(responses: Iterable[int], questionnaire: List[Item]) -> dict:
    payload = _prepare_scoring_input(responses, questionnaire, "mbti")
    result = _invoke_nodejs_scoring(payload)
    return _handle_process_result(result)


def get_mbti_type(percentages: Mapping[str, float]) -> str:
    """Return four-letter type code from MBTI dichotomy percentages."""

    parts = [
        "E" if percentages.get("EI", 50) >= 50 else "I",
        "S" if percentages.get("SN", 50) >= 50 else "N",
        "T" if percentages.get("TF", 50) >= 50 else "F",
        "J" if percentages.get("JP", 50) >= 50 else "P",
    ]
    return "".join(parts)
