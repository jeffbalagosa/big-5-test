import json
import subprocess

import pytest

import modules.scoring_bridge as bridge
from modules.models import Item


def test_check_nodejs_available_missing(monkeypatch):
    def fake_run(*_args, **_kwargs):
        raise FileNotFoundError("node not found")

    monkeypatch.setattr(subprocess, "run", fake_run)

    with pytest.raises(FileNotFoundError):
        bridge.check_nodejs_available()


def test_prepare_scoring_input_builds_expected_json():
    questions = [Item(text="Q1", trait="Openness", reverse=False)]
    body = bridge._prepare_scoring_input([5], questions, "big5")
    payload = json.loads(body)
    assert payload["test_type"] == "big5"
    assert payload["answers"]["1"] == 5
    assert payload["questions"][0]["trait"] == "Openness"
    assert payload["questions"][0]["reverse"] is False


def test_score_big5_nodejs_integration():
    questions = [Item(text="I am curious", trait="Openness", reverse=False)]
    scores = bridge.score_big5_nodejs([5], questions)
    assert scores["Openness"] == 100
    assert scores["Conscientiousness"] == 50


def test_score_mbti_nodejs_integration():
    questions = [
        Item(text="I gain energy from people", trait="EI", reverse=False),
        Item(text="I prefer quiet time", trait="EI", reverse=True),
    ]
    scores = bridge.score_mbti_nodejs([6, 1], questions)
    assert scores["E"] == 100
    assert scores["I"] == 0
    assert scores["type"] == "ESTJ"


def test_invalid_process_output(monkeypatch):
    questions = [Item(text="Q1", trait="Openness", reverse=False)]
    fake_result = subprocess.CompletedProcess(
        args=["node"], returncode=0, stdout="not-json", stderr=""
    )
    monkeypatch.setattr(bridge, "_invoke_nodejs_scoring", lambda payload: fake_result)

    with pytest.raises(bridge.NodeScoringError):
        bridge.score_big5_nodejs([5], questions)
