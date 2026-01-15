"""CLI logic for administering personality questionnaires."""

from modules.models import LIKERT_LABELS, MBTI_DICHOTOMIES
from modules.scoring_bridge import (
    check_nodejs_available,
    score_big5_nodejs,
    score_mbti_nodejs,
)


def collect_answers(questions, input_func=None, print_func=None):
    if input_func is None:
        input_func = input
    if print_func is None:
        print_func = print
    answers = []
    while True:
        if len(answers) < len(questions):
            question_index = len(answers)
            question = questions[question_index]
            print_func(f"{question_index + 1}. {question.text}")
        else:
            print_func(
                "All questions answered. Type 'z' to undo the last answer or press Enter to finish."
            )

        user_input = input_func()

        if (user_input.lower() == "done" or user_input == "") and len(answers) == len(
            questions
        ):
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


def administer(QUESTIONS, test_type="big5"):
    """Administer the questionnaire via CLI."""
    check_nodejs_available()
    test_name = (
        "Myers-Briggs Type Indicator (MBTI)"
        if test_type == "mbti"
        else "Big-Five Personality Test"
    )
    print(f"\n# Welcome to the {test_name}!\n")
    print("## —— **Instructions** ——\n")
    print("Answer each statement with a number 1-5 based on the Likert scale below:")
    for k in range(1, 6):
        print(f"  {k}: {LIKERT_LABELS[k]}")
    print()
    print("Type 'z' to undo the previous answer.\n")
    print("## —— **Questions** ——\n")
    answers = collect_answers(QUESTIONS)

    if test_type == "mbti":
        scores = score_mbti_nodejs(answers, QUESTIONS)
        type_code = scores["type"]
        print(f"\n## —— **Your MBTI Results: {type_code}** ——")
        trait_map = {
            "EI": scores["E"],
            "SN": scores["S"],
            "TF": scores["T"],
            "JP": scores["J"],
        }
        for trait, percent in trait_map.items():
            pole1, pole2 = MBTI_DICHOTOMIES[trait]
            p1_val = float(percent)
            p2_val = 100 - p1_val
            dominant = pole1 if p1_val >= 50 else pole2
            print(
                f"{pole1:>12} {p1_val:5.1f}%  <——>  {p2_val:5.1f}% {pole2:<12}  (Dominant: {dominant})"
            )
    else:
        results = score_big5_nodejs(answers, QUESTIONS)
        print("\n## —— **Your Big-Five Results** ——")
        for trait, percent in results.items():
            print(f"{trait:<17} {float(percent):6.1f}%")
    return answers
