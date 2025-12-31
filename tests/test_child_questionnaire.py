from modules.data_loader import load_questionnaire


def test_load_adult_questionnaire():
    """Test that the default questionnaire is the adult version."""
    questions = load_questionnaire(child=False)
    # Check a specific item that is different in the child version
    # Adult: I enjoy reflecting on philosophical or abstract ideas.
    # Child: I like thinking about big questions and "what if" ideas.
    found = False
    for q in questions:
        if "philosophical" in q.text:
            found = True
            break
    assert found, "Adult questionnaire should contain 'philosophical'"


def test_load_child_questionnaire():
    """Test that the child questionnaire is loaded when child=True."""
    questions = load_questionnaire(child=True)
    # Child: I like thinking about big questions and "what if" ideas.
    found = False
    for q in questions:
        if "what if" in q.text:
            found = True
            break
    assert found, "Child questionnaire should contain 'what if'"


def test_child_questionnaire_structure():
    """Verify child questionnaire has 50 items and all 5 traits."""
    questions = load_questionnaire(child=True)
    assert len(questions) == 50

    traits = set(q.trait for q in questions)
    expected_traits = {
        "Openness",
        "Conscientiousness",
        "Extraversion",
        "Agreeableness",
        "Neuroticism",
    }
    assert traits == expected_traits

    for trait in expected_traits:
        count = len([q for q in questions if q.trait == trait])
        assert count == 10, f"Trait {trait} should have 10 items"
