"""Unit tests for big_5 questionnaire."""
import pytest
from big_5 import QUESTIONS, _score_item, score_responses

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

def test_full_scoring_sum():
    """Verify that summed trait scores match manual calculation."""
    # create an artificial response set:
    # - all normal items answered '3'
    # - all reverse items answered '3' (which stays 3 post-reverse)
    responses = [3] * len(QUESTIONS)
    totals = score_responses(responses)

    # For each trait, expected = 3 * number_of_items
    from collections import Counter
    counts = Counter(q.trait for q in QUESTIONS)
    for trait, n_items in counts.items():
        assert totals[trait] == 3 * n_items

def test_invalid_response_value():
    """Entering a value outside 1-5 should raise."""
    from big_5 import Item
    with pytest.raises(ValueError):
        _score_item(Item("dummy", "Openness"), 0)

def test_wrong_response_length():
    """Mismatched response list raises ValueError."""
    with pytest.raises(ValueError):
        score_responses([3, 3])  # too short
