"""Scoring utilities for the Big-Five questionnaire."""

from models import Item

def _score_item(item: Item, response: int) -> int:
    """Convert a raw Likert response (1-5) into its scored value."""
    if response not in range(1, 6):
        raise ValueError("Responses must be integers 1-5.")
    return 6 - response if item.reverse else response


def score_responses(responses, questionnaire):
    if len(responses) != len(questionnaire):
        raise ValueError("Number of responses does not match questionnaire length.")
    scores = {
        "Extraversion": 0,
        "Agreeableness": 0,
        "Conscientiousness": 0,
        "Neuroticism": 0,
        "Openness": 0,
    }
    for item, response in zip(questionnaire, responses):
        scores[item.trait] += _score_item(item, response)
    return scores
