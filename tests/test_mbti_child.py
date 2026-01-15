from modules.data_loader import load_questionnaire
from modules.scoring_bridge import score_mbti_nodejs


def test_load_mbti_child_questionnaire():
    """Test that the child MBTI questionnaire loads correctly."""
    questions = load_questionnaire(test_type="mbti", child=True)

    # Should have 40 items
    assert len(questions) == 40

    # Check distribution of traits (10 each)
    traits = [q.trait for q in questions]
    assert traits.count("EI") == 10
    assert traits.count("SN") == 10
    assert traits.count("TF") == 10
    assert traits.count("JP") == 10

    # Check some specific text to ensure it's the child version
    # Item 1: "After hanging out with friends all day, you feel full of energy."
    expected_text = "After hanging out with friends all day, you feel full of energy."
    assert questions[0].text == expected_text
    assert questions[0].trait == "EI"
    assert questions[0].reverse is False


def test_mbti_child_scoring():
    """Test scoring with child MBTI questions."""
    questions = load_questionnaire(test_type="mbti", child=True)

    # Mock responses: all 5s (Strongly Agree)
    # For EI: 5 non-reverse (5), 5 reverse (1) -> (5*5 + 5*1)/10 = 3.0 (Neutral)
    # Wait, let's check the reverse flags in mbti-child.yaml
    # EI: 1(F), 2(T), 3(F), 4(F), 5(T), 6(T), 7(F), 8(T), 9(F), 10(F)
    # Non-reverse: 1, 3, 4, 7, 9, 10 (6 items)
    # Reverse: 2, 5, 6, 8 (4 items)
    # If all are 5:
    # Non-reverse: 6 * 5 = 30
    # Reverse: 4 * (6-5) = 4 * 1 = 4
    # Total = 34. Avg = 3.4.

    responses = [5] * len(questions)
    scores = score_mbti_nodejs(responses, questions)

    assert "E" in scores
    assert "I" in scores
    assert "S" in scores
    assert "N" in scores
    assert "type" in scores

    for key in ("E", "I", "S", "N", "T", "F", "J", "P"):
        assert 0 <= scores[key] <= 100


def test_mbti_child_type_generation():
    """Test that we can get an MBTI type from child responses."""
    questions = load_questionnaire(test_type="mbti", child=True)

    # Mock responses to get a specific type, e.g., ENFJ
    # E > 50, N > 50, F > 50, J > 50
    responses = []
    for q in questions:
        if q.trait == "EI":
            responses.append(5 if not q.reverse else 1)  # E
        elif q.trait == "SN":
            responses.append(1 if not q.reverse else 5)  # N
        elif q.trait == "TF":
            responses.append(1 if not q.reverse else 5)  # F
        elif q.trait == "JP":
            responses.append(5 if not q.reverse else 1)  # J

    scores = score_mbti_nodejs(responses, questions)

    assert scores["type"] == "ENFJ"
