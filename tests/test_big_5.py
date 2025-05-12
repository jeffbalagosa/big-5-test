"""Unit tests for big_5 questionnaire."""

import pytest
from big_5 import QUESTIONS
from scoring import score_responses, _score_item
from modules.cli import collect_answers
from modules.models import Item


@pytest.fixture
def mock_questions():
    return [
        Item("You are outgoing.", "Extraversion", False),
        Item("You are kind.", "Agreeableness", False),  # Remove leading space
    ]


def test_collect_answers_no_undo(mock_questions, capsys):
    inputs = iter(["3", "4", "done"])
    answers = collect_answers(mock_questions, input_func=lambda: next(inputs))
    captured = capsys.readouterr()
    assert answers == [3, 4]
    assert "1. You are outgoing." in captured.out
    assert "2. You are kind." in captured.out


def test_collect_answers_undo_once(mock_questions, capsys):
    inputs = iter(["3", "4", "z", "5", "done"])
    answers = collect_answers(mock_questions, input_func=lambda: next(inputs))
    captured = capsys.readouterr()
    assert answers == [3, 5]
    assert "Undid last answer." in captured.out


def test_collect_answers_undo_multiple(mock_questions, capsys):
    inputs = iter(["3", "z", "4", "5", "z", "z", "2", "3", "done"])
    answers = collect_answers(mock_questions, input_func=lambda: next(inputs))
    captured = capsys.readouterr()
    assert answers == [2, 3]
    assert "Undid last answer." in captured.out


def test_full_scoring_sum(mock_questions):
    responses = [3, 4]
    scores = score_responses(responses, mock_questions)
    assert scores["Extraversion"] == 3
    assert scores["Agreeableness"] == 4
    assert sum(scores.values()) == 7


def test_reverse_scoring():
    item = next(q for q in QUESTIONS if q.reverse)
    assert _score_item(item, 5) == 1
    assert _score_item(item, 1) == 5


def test_regular_scoring():
    item = next(q for q in QUESTIONS if not q.reverse)
    assert _score_item(item, 3) == 3


def test_invalid_response_value():
    from big_5 import Item

    with pytest.raises(ValueError):
        _score_item(Item("dummy", "Openness"), 0)


def test_wrong_response_length():
    with pytest.raises(ValueError):
        score_responses([3, 3], QUESTIONS)


def test_collect_answers_undo_no_answers():
    questions = [Item("Q1", "Trait1"), Item("Q2", "Trait2")]
    inputs = iter(["z", "3", "4", "done"])
    outputs = []

    def mock_print(*args):
        outputs.append(" ".join(map(str, args)))

    answers = collect_answers(
        questions, input_func=lambda: next(inputs), print_func=mock_print
    )
    assert "No answers to undo." in outputs
    assert answers == [3, 4]


def test_score_responses_missing_argument():
    with pytest.raises(TypeError):
        score_responses([1, 2])


def test_no_question_repeats_without_undo(mock_questions, capsys):
    inputs = iter(["2", "5", "done"])
    answers = collect_answers(mock_questions, input_func=lambda: next(inputs))
    captured = capsys.readouterr()
    assert captured.out.count("1. You are outgoing.") == 1
    assert captured.out.count("2. You are kind.") == 1
    assert answers == [2, 5]


def test_score_responses_handles_reverse_scoring():
    from modules.models import Item
    from scoring import score_responses

    items = [
        Item(text="I am organized.", trait="Conscientiousness", reverse=False),
        Item(
            text="I leave my belongings around.",
            trait="Conscientiousness",
            reverse=True,
        ),
    ]

    answers = [5, 5]
    result = score_responses(answers, items)
    assert result["Conscientiousness"] == 6
