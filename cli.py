"""CLI logic for administering the Big-Five questionnaire."""

from models import LIKERT_LABELS
from scoring import score_responses


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


def administer(QUESTIONS):
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
