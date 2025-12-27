"""Scoring utilities for the Big-Five questionnaire."""

from modules.models import Item


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


def score_mbti_responses(responses, questionnaire):
    """
    Score MBTI responses and return percentage for each dichotomy.
    Percentage represents preference for the first pole (E, S, T, J).
    """
    if len(responses) != len(questionnaire):
        raise ValueError("Number of responses does not match questionnaire length.")

    # Initialize sums and counts
    sums = {"EI": 0, "SN": 0, "TF": 0, "JP": 0}
    counts = {"EI": 0, "SN": 0, "TF": 0, "JP": 0}

    for item, response in zip(questionnaire, responses):
        trait = item.trait
        if trait in sums:
            sums[trait] += _score_item(item, response)
            counts[trait] += 1

    # Calculate percentages (1-5 scale, so min is 1*count, max is 5*count)
    # Percentage = (score - min) / (max - min) * 100
    percentages = {}
    for trait in sums:
        if counts[trait] > 0:
            min_score = counts[trait] * 1
            max_score = counts[trait] * 5
            percentages[trait] = (
                (sums[trait] - min_score) / (max_score - min_score)
            ) * 100
        else:
            percentages[trait] = 50.0

    return percentages


def get_mbti_type(percentages):
    """Determine 4-letter MBTI type from percentages."""
    type_code = ""
    type_code += "E" if percentages["EI"] >= 50 else "I"
    type_code += "S" if percentages["SN"] >= 50 else "N"
    type_code += "T" if percentages["TF"] >= 50 else "F"
    type_code += "J" if percentages["JP"] >= 50 else "P"
    return type_code
