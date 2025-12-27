"""Data models and constants for the Big-Five questionnaire."""

from dataclasses import dataclass

LIKERT_LABELS = {
    1: "Strongly Disagree",
    2: "Disagree",
    3: "Neutral",
    4: "Agree",
    5: "Strongly Agree",
}


@dataclass(frozen=True)
class Item:
    text: str
    trait: str  # Openness, Conscientiousness, etc.
    dimension: str = ""  # Generic term for trait or dichotomy
    reverse: bool = False  # True ⇢ reverse-scored


MBTI_DICHOTOMIES = {
    "EI": ("Extraversion", "Introversion"),
    "SN": ("Sensing", "Intuition"),
    "TF": ("Thinking", "Feeling"),
    "JP": ("Judging", "Perceiving"),
}
