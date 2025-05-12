"""Administer and score a short Big-Five questionnaire.

Usage
-----
$ python big_5.py            # runs an interactive CLI survey
$ python -m pytest           # run unit tests in /tests
"""

from typing import List
from data_loader import load_questions_from_yaml
from models import Item, LIKERT_LABELS
from scoring import score_responses
from cli import collect_answers


# ————————————————————————————————————————————
# Questionnaire definition
# ————————————————————————————————————————————
QUESTIONS: List[Item] = load_questions_from_yaml("questionnaire.yaml")


# ————————————————————————————————————————————
# CLI administration
# ————————————————————————————————————————————


def administer():
    """Administer the Big-Five questionnaire via CLI."""
    print("Answer each statement with a number 1-5:")
    print("  Likert scale:")
    for k in range(1, 6):
        print(f"    {k}: {LIKERT_LABELS[k]}")
    print()
    answers = collect_answers(QUESTIONS)
    results = score_responses(answers, QUESTIONS)
    print("\n—— Your Big-Five Raw Scores ——")
    for trait, total in results.items():
        print(
            f"{trait:<17} {total:>2d} / {len([q for q in QUESTIONS if q.trait == trait]) * 5}"
        )


if __name__ == "__main__":
    administer()
