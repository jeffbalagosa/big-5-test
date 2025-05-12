"""Administer and score a short Big-Five questionnaire.

Usage
-----
$ python big_5.py            # runs an interactive CLI survey
$ python -m pytest           # run unit tests in /tests
"""

from typing import List
import yaml
from models import Item, LIKERT_LABELS


def load_questions_from_yaml(path: str) -> List[Item]:
    """Load questionnaire items from a YAML file."""
    with open(path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)
    items = []
    for entry in data["items"]:
        items.append(
            Item(
                text=entry["text"],
                trait=entry["trait"],
                reverse=entry.get("reverse", False),
            )
        )
    return items


# ————————————————————————————————————————————
# Questionnaire definition
# ————————————————————————————————————————————
QUESTIONS: List[Item] = load_questions_from_yaml("questionnaire.yaml")


# ————————————————————————————————————————————
# Scoring utilities
# ————————————————————————————————————————————
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


# ————————————————————————————————————————————
# CLI administration
# ————————————————————————————————————————————
def collect_answers(questions, input_func=input, print_func=print):
    answers = []
    while True:
        if len(answers) < len(questions):
            question_index = len(answers)
            question = questions[question_index]
            print_func(f"{question_index + 1}. {question.text}")
        else:
            print_func(
                "All questions answered. Type 'z' to undo the last answer or 'done' to finish."
            )

        user_input = input_func()

        if user_input.lower() == "done" and len(answers) == len(questions):
            break
        elif user_input.lower() == "z":
            if len(answers) > 0:
                answers.pop()
                print_func("Undid last answer.")
            else:
                print_func("No answers to undo.")
        else:
            try:
                response = int(user_input)
                if 1 <= response <= 5:
                    if len(answers) < len(questions):
                        answers.append(response)
                    else:
                        print_func(
                            "All questions are answered. Type 'z' to undo or 'done' to finish."
                        )
                else:
                    print_func("Please enter a number between 1 and 5.")
            except ValueError:
                print_func("Invalid input. Please enter a number, 'z', or 'done'.")

    return answers


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
