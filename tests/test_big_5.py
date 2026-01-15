"""Unit tests for big_5 questionnaire."""

import pytest
from modules.data_loader import load_questionnaire
from modules.scoring_bridge import score_big5_nodejs
from modules.cli import collect_answers
from modules.models import Item

QUESTIONS = load_questionnaire("big5")


@pytest.fixture
def mock_questions():
    return [
        Item("You are outgoing.", "Extraversion", reverse=False),
        Item("You are kind.", "Agreeableness", reverse=False),
    ]


def test_collect_answers_no_undo(mock_questions, capsys):
    # Test finishing with 'done'
    inputs = iter(["3", "4", "done"])
    answers = collect_answers(mock_questions, input_func=lambda: next(inputs))
    captured = capsys.readouterr()
    assert answers == [3, 4]
    assert "1. You are outgoing." in captured.out
    assert "2. You are kind." in captured.out

    # Test finishing with Enter (empty string)
    inputs2 = iter(["3", "4", ""])
    answers2 = collect_answers(mock_questions, input_func=lambda: next(inputs2))
    assert answers2 == [3, 4]


def test_collect_answers_undo_once(mock_questions, capsys):
    inputs = iter(["3", "4", "z", "5", "done"])
    answers = collect_answers(mock_questions, input_func=lambda: next(inputs))
    captured = capsys.readouterr()
    assert answers == [3, 5]
    assert "Undid last answer." in captured.out

    inputs2 = iter(["3", "4", "z", "5", ""])
    answers2 = collect_answers(mock_questions, input_func=lambda: next(inputs2))
    assert answers2 == [3, 5]


def test_collect_answers_undo_multiple(mock_questions, capsys):
    inputs = iter(["3", "z", "4", "5", "z", "z", "2", "3", "done"])
    answers = collect_answers(mock_questions, input_func=lambda: next(inputs))
    captured = capsys.readouterr()
    assert answers == [2, 3]
    assert "Undid last answer." in captured.out

    inputs2 = iter(["3", "z", "4", "5", "z", "z", "2", "3", ""])
    answers2 = collect_answers(mock_questions, input_func=lambda: next(inputs2))
    assert answers2 == [2, 3]


def test_score_big5_percentages(mock_questions):
    responses = [3, 4]
    scores = score_big5_nodejs(responses, mock_questions)
    assert scores["Extraversion"] == 50
    assert scores["Agreeableness"] == 75
    assert scores["Conscientiousness"] == 50  # untouched traits default to 50


def test_reverse_scoring_applied():
    reverse_question = Item("Reverse", "Openness", reverse=True)
    scores = score_big5_nodejs([5], [reverse_question])
    assert scores["Openness"] == 0


def test_invalid_response_value():
    with pytest.raises(ValueError):
        score_big5_nodejs([0], QUESTIONS[:1])


def test_wrong_response_length():
    with pytest.raises(ValueError):
        score_big5_nodejs([3, 3], QUESTIONS[:1])


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


def test_no_question_repeats_without_undo(mock_questions, capsys):
    inputs = iter(["2", "5", "done"])
    answers = collect_answers(mock_questions, input_func=lambda: next(inputs))
    captured = capsys.readouterr()
    assert captured.out.count("1. You are outgoing.") == 1
    assert captured.out.count("2. You are kind.") == 1
    assert answers == [2, 5]

    inputs2 = iter(["2", "5", ""])
    answers2 = collect_answers(mock_questions, input_func=lambda: next(inputs2))
    assert answers2 == [2, 5]


def test_reverse_scoring_ordered_items():
    items = [
        Item(text="I am organized.", trait="Conscientiousness", reverse=False),
        Item(
            text="I leave my belongings around.",
            trait="Conscientiousness",
            reverse=True,
        ),
    ]

    answers = [5, 5]
    result = score_big5_nodejs(answers, items)
    assert result["Conscientiousness"] == 50
