"""Administer and score a short Big-Five questionnaire.

Usage
-----
$ python big_5.py            # runs an interactive CLI survey
$ python -m pytest           # run unit tests in /tests
"""

from dataclasses import dataclass
from typing import List, Dict

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


# ————————————————————————————————————————————
# Questionnaire definition
# ————————————————————————————————————————————
QUESTIONS: List[Item] = [
    # Openness
    Item("I enjoy trying new and different things.", "Openness"),
    Item("I have a vivid imagination.", "Openness"),
    Item("I enjoy reflecting on philosophical or abstract ideas.", "Openness"),
    Item("I often enjoy playing with ideas just for fun.", "Openness"),
    Item("I am curious about many different things.", "Openness"),
    Item("I prefer routine over variety.", "Openness", reverse=True),
    Item("I have difficulty appreciating art or music.", "Openness", reverse=True),
    # Conscientiousness
    Item("I pay attention to details.", "Conscientiousness"),
    Item("I make plans and stick to them.", "Conscientiousness"),
    Item("I am always prepared.", "Conscientiousness"),
    Item("I follow through on my commitments.", "Conscientiousness"),
    Item(
        "I often forget to put things back in their proper place.",
        "Conscientiousness",
        reverse=True,
    ),
    Item("I sometimes shirk my duties.", "Conscientiousness", reverse=True),
    Item("I do things efficiently and thoroughly.", "Conscientiousness"),
    # Extraversion
    Item("I feel comfortable around people.", "Extraversion"),
    Item("I make friends easily.", "Extraversion"),
    Item("I enjoy being the center of attention.", "Extraversion"),
    Item("I am full of energy in social situations.", "Extraversion"),
    Item("I often prefer to be alone.", "Extraversion", reverse=True),
    Item("I tend to keep in the background.", "Extraversion", reverse=True),
    Item("I like to start conversations.", "Extraversion"),
    # Agreeableness
    Item("I sympathize with others' feelings.", "Agreeableness"),
    Item("I am interested in people’s problems.", "Agreeableness"),
    Item("I try to be courteous to everyone I meet.", "Agreeableness"),
    Item("I make people feel at ease.", "Agreeableness"),
    Item("I insult people when I’m frustrated.", "Agreeableness", reverse=True),
    Item(
        "I am not interested in other people's problems.", "Agreeableness", reverse=True
    ),
    Item("I take time out for others.", "Agreeableness"),
    # Neuroticism
    Item("I get stressed out easily.", "Neuroticism"),
    Item("I often feel anxious or worried.", "Neuroticism"),
    Item("I frequently feel blue or down.", "Neuroticism"),
    Item("I have frequent mood swings.", "Neuroticism"),
    Item("I remain calm under pressure.", "Neuroticism", reverse=True),
    Item("I rarely feel depressed or anxious.", "Neuroticism", reverse=True),
    Item("I worry about things that might go wrong.", "Neuroticism"),
]


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
    print("  1 = Strongly Disagree … 5 = Strongly Agree\n")

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
