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
    """Build the JSON payload for the Node.js scoring CLI.

    This function validates inputs and constructs the standardized JSON format
    that the Node.js CLI expects. The payload includes:
    - answers: map of question ID to user response (1-5 or 1-6)
    - questions: metadata about each question (trait, reverse scoring flag)
    - test_type: either 'big5' or 'mbti' to route to the correct scoring algorithm
    - maxVal: maximum Likert scale value (5 for Big-5, 6 for MBTI)

    The response validation ensures all values fall within the valid Likert range.
    Question metadata is indexed starting at 1 to match the Node.js side.

    Args:
        responses: iterable of integer responses (1-5 or 1-6 depending on test_type)
        questionnaire: sequence of Item objects containing trait and reverse flags
        test_type: either 'big5' or 'mbti'

    Returns:
        JSON string ready to pass to Node.js subprocess

    Raises:
        ValueError: if test_type is invalid, response count doesn't match questionnaire,
                   or any response value is outside the valid range
    """
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
    """Execute the Node.js scoring CLI as a subprocess.

    This function spawns a new Node.js process running lib/scoring/cli.js,
    passes the JSON-serialized scoring input via stdin, and captures the
    JSON-formatted results from stdout. This approach maintains a clear
    separation between Python and JavaScript runtimes while ensuring consistent
    scoring logic across the React frontend and Python CLI.

    Args:
        json_input: JSON string containing answers, questions, test_type, and maxVal

    Returns:
        subprocess.CompletedProcess object containing stdout, stderr, and returncode

    Raises:
        FileNotFoundError: if Node.js executable is not found in PATH
    """
    if not CLI_PATH.exists():
        raise FileNotFoundError(f"Scoring CLI not found at {CLI_PATH}")

    try:
        # Use subprocess.run with check=False to capture both success and error outputs
        # This allows us to handle errors gracefully and provide detailed error messages
        result = subprocess.run(
            ["node", str(CLI_PATH)],
            input=json_input,  # Pass JSON via stdin to the Node.js process
            capture_output=True,  # Capture both stdout and stderr
            text=True,  # Return strings instead of bytes
            check=False,  # Don't raise on non-zero exit; handle manually
        )
    except FileNotFoundError as exc:  # pragma: no cover - environment dependent
        raise FileNotFoundError(
            "Node.js executable not found. Ensure Node.js is installed and in PATH."
        ) from exc

    return result


def _parse_scoring_output(stdout: str) -> dict:
    """Parse the JSON response from the Node.js scoring CLI.

    The Node.js CLI returns responses in this format:
    {
        "ok": true,
        "scores": { trait/dichotomy scores }
    }

    On error, it returns:
    {
        "ok": false,
        "error": "error message"
    }

    This function validates the JSON structure and extracts the scores,
    raising NodeScoringError if the operation failed or the format is invalid.

    Args:
        stdout: raw string output from Node.js subprocess

    Returns:
        dictionary of computed scores (trait percentages or dichotomy values)

    Raises:
        NodeScoringError: if JSON is malformed or if the Node.js process reports an error
    """
    try:
        payload = json.loads(stdout.strip())
    except json.JSONDecodeError as exc:
        raise NodeScoringError("Invalid JSON returned from scoring process") from exc

    if not payload.get("ok"):
        raise NodeScoringError(payload.get("error", "Unknown scoring error"))

    return payload["scores"]


def _handle_process_result(result: subprocess.CompletedProcess) -> dict:
    """Validate and extract results from a completed subprocess.

    This function checks the exit code and ensures stdout contains valid JSON output.
    It serves as the final error handling layer before returning scores to the caller.

    Args:
        result: CompletedProcess from _invoke_nodejs_scoring

    Returns:
        dictionary of computed scores

    Raises:
        NodeScoringError: if process exited with error code, produced no output,
                         or returned invalid JSON/error response
    """
    if result.returncode != 0:
        message = result.stdout.strip() or result.stderr.strip() or "Scoring failed"
        raise NodeScoringError(message)

    if not result.stdout.strip():
        raise NodeScoringError("Scoring process returned no output.")

    return _parse_scoring_output(result.stdout)


def score_big5_nodejs(
    responses: Iterable[int], questionnaire: List[Item]
) -> dict[str, int]:
    payload = _prepare_scoring_input(responses, questionnaire, "big5")
    result = _invoke_nodejs_scoring(payload)
    return _handle_process_result(result)


def score_mbti_nodejs(
    responses: Iterable[int], questionnaire: List[Item]
) -> dict[str, int | str]:
    payload = _prepare_scoring_input(responses, questionnaire, "mbti")
    result = _invoke_nodejs_scoring(payload)
    return _handle_process_result(result)


def get_mbti_type(percentages: Mapping[str, float]) -> str:
    """Return four-letter type code from MBTI dichotomy scores (0-100)."""

    parts = [
        "E" if percentages.get("EI", 50) >= 50 else "I",
        "S" if percentages.get("SN", 50) >= 50 else "N",
        "T" if percentages.get("TF", 50) >= 50 else "F",
        "J" if percentages.get("JP", 50) >= 50 else "P",
    ]
    return "".join(parts)
