"""Administer and score a short Big-Five questionnaire.

Usage
-----
$ python big_5.py            # runs an interactive CLI survey
$ python -m pytest           # run unit tests in /tests
"""

from typing import List
from data_loader import load_questions_from_yaml
from models import Item
from cli import administer


# ————————————————————————————————————————————
# Questionnaire definition
# ————————————————————————————————————————————
QUESTIONS: List[Item] = load_questions_from_yaml("questionnaire.yaml")

if __name__ == "__main__":
    administer(QUESTIONS)
