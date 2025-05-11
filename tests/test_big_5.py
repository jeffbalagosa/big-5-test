"""Unit tests for big_5 questionnaire."""

import pytest
from big_5 import QUESTIONS, _score_item, score_responses, collect_answers, Item


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
    scores = score_responses(
        responses, mock_questions
    )  # Pass mock_questions as second argument
    assert scores["Extraversion"] == 3
    assert scores["Agreeableness"] == 4  # Remove leading space in key
    assert sum(scores.values()) == 7


def test_reverse_scoring():
    """Ensure reverse-scored items flip the scale correctly."""
    item = next(q for q in QUESTIONS if q.reverse)  # grab any reverse item
    # Strongly Agree (5) should become 1 after reversing
    assert _score_item(item, 5) == 1
    # Strongly Disagree (1) should become 5
    assert _score_item(item, 1) == 5


def test_regular_scoring():
    """Non-reverse items should keep their value."""
    item = next(q for q in QUESTIONS if not q.reverse)
    assert _score_item(item, 3) == 3


def test_invalid_response_value():
    """Entering a value outside 1-5 should raise."""
    from big_5 import Item

    with pytest.raises(ValueError):
        _score_item(Item("dummy", "Openness"), 0)


def test_wrong_response_length():
    """Mismatched response list raises ValueError."""
    with pytest.raises(ValueError):
        score_responses([3, 3], QUESTIONS)  # Add missing argument


def test_collect_answers_undo_no_answers():
    """Test attempting to undo when there are no answers."""
    questions = [Item("Q1", "Trait1"), Item("Q2", "Trait2")]
    inputs = iter(["z", "3", "4", "done"])  # Add 'done' to avoid StopIteration
    outputs = []

    def mock_print(*args):
        outputs.append(" ".join(map(str, args)))

    answers = collect_answers(
        questions, input_func=lambda: next(inputs), print_func=mock_print
    )
    assert "No answers to undo." in outputs
    assert answers == [3, 4]


def test_score_responses_missing_argument(mock_questions):
    """Calling score_responses with only one argument should raise TypeError."""
    with pytest.raises(TypeError):
        score_responses([1, 2])
