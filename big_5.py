"""Administer and score a short Big-Five questionnaire.

Usage
-----
$ python big_5.py            # runs an interactive CLI survey
$ python -m pytest           # run unit tests in /tests
"""

from dataclasses import dataclass
from typing import List, Dict
import yaml

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
    reverse: bool = False  # True ⇢ reverse-scored


def load_questions_from_yaml(path: str) -> List[Item]:
    """Load questionnaire items from a YAML file."""
    with open(path, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
    items = []
    for entry in data['items']:
        items.append(
            Item(
                text=entry['text'],
                trait=entry['trait'],
                reverse=entry.get('reverse', False)
            )
        )
    return items


# ————————————————————————————————————————————
# Questionnaire definition
# ————————————————————————————————————————————
QUESTIONS: List[Item] = load_questions_from_yaml('questionnaire.yaml')


# ————————————————————————————————————————————
# Scoring utilities
# ————————————————————————————————————————————
def _score_item(item: Item, response: int) -> int:
    """Convert a raw Likert response (1-5) into its scored value."""
    if response not in range(1, 6):
        raise ValueError("Responses must be integers 1-5.")
    return 6 - response if item.reverse else response


def score_responses(responses: List[int]) -> Dict[str, int]:
    """Return summed scores for each trait."""
    if len(responses) != len(QUESTIONS):
        raise ValueError("Number of responses does not match questionnaire length.")

    scores: Dict[str, int] = {
        "Openness": 0,
        "Conscientiousness": 0,
        "Extraversion": 0,
        "Agreeableness": 0,
        "Neuroticism": 0,
    }

    for item, resp in zip(QUESTIONS, responses):
        scores[item.trait] += _score_item(item, resp)

    return scores


# ————————————————————————————————————————————
# CLI administration
# ————————————————————————————————————————————
def administer() -> None:
    print("Answer each statement with a number 1-5:")
    print("  Likert scale:")
    for k in range(1, 6):
        print(f"    {k}: {LIKERT_LABELS[k]}")
    print()

    answers: List[int] = []
    for idx, item in enumerate(QUESTIONS, start=1):
        while True:
            try:
                raw = input(f"{idx:2d}. {item.text}  ")
                answers.append(int(raw))
                break
            except ValueError:
                print("Please enter an integer 1-5.")

    results = score_responses(answers)
    print("\n—— Your Big-Five Raw Scores ——")
    for trait, total in results.items():
        print(
            f"{trait:<17} {total:>2d} / {len([q for q in QUESTIONS if q.trait == trait])*5}"
        )


if __name__ == "__main__":
    administer()
