"""CLI logic for administering the Big-Five questionnaire."""

from modules.models import LIKERT_LABELS
from modules.scoring import score_responses


def collect_answers(questions, input_func=input, print_func=print):
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


def administer(QUESTIONS):
    """Administer the Big-Five questionnaire via CLI."""
    print("\n# Welcome to the Big-Five Personality Test!\n")
    print("## —— **Instructions** ——\n")
    print("Answer each statement with a number 1-5 based on the Likert scale below:")
    for k in range(1, 6):
        print(f"  {k}: {LIKERT_LABELS[k]}")
    print()
    print("Type 'z' to undo the previous answer.\n")
    print("## —— **Questions** ——\n")
    answers = collect_answers(QUESTIONS)
    results = score_responses(answers, QUESTIONS)
    print("\n## —— **Your Big-Five Results** ——")
    for trait, total in results.items():
        max_score = len([q for q in QUESTIONS if q.trait == trait]) * 5
        percent = (total / max_score) * 100 if max_score else 0
        print(f"{trait:<17} {percent:6.1f}%")
    return answers
