"""Administer and score a short Big-Five questionnaire.

Usage
-----
$ python big_5.py            # runs an interactive CLI survey
$ python -m pytest           # run unit tests in /tests
"""

from modules.data_loader import load_questionnaire
from modules.cli import administer
import argparse
import io
import pandas as pd
from modules.plotting import create_bar_graph, create_mbti_bar_graph
from modules.pdf_report import generate_pdf_report
from modules.scoring_bridge import (
    check_nodejs_available,
    score_big5_nodejs,
    score_mbti_nodejs,
)


def export_pdf_report(
    questions,
    responses,
    output_pdf_path,
    title="Personality Test Results",
    author=None,
    test_type="big5",
):
    """
    Generate a PDF report with a bar graph of trait scores (percentages).
    """
    img_buffer = io.BytesIO()

    if test_type == "mbti":
        scores = score_mbti_nodejs(responses, questions)
        type_code = scores["type"]
        title = f"MBTI Results: {type_code}"
        dichotomy_percentages = {
            "EI": scores["E"],
            "SN": scores["S"],
            "TF": scores["T"],
            "JP": scores["J"],
        }
        create_mbti_bar_graph(dichotomy_percentages, img_buffer)
    else:
        scores = score_big5_nodejs(responses, questions)
        data = pd.DataFrame(
            {
                "Category": list(scores.keys()),
                "Score": list(scores.values()),
            }
        )
        max_scores = {trait: 100 for trait in scores}
        create_bar_graph(data, img_buffer, max_scores=max_scores)

    # Generate PDF report
    generate_pdf_report(title, img_buffer, output_pdf_path, author=author)
    print(f"PDF report saved to {output_pdf_path}")


def main():
    try:
        check_nodejs_available()
    except Exception as exc:  # pragma: no cover - user environment
        print(f"Error: {exc}")
        return

    parser = argparse.ArgumentParser(description="Personality Questionnaire CLI")
    parser.add_argument(
        "--test",
        choices=["big5", "mbti"],
        default="big5",
        help="Select personality test type (default: big5)",
    )
    parser.add_argument(
        "--pdf",
        metavar="PDF_PATH",
        help="Export results as a PDF report to the given file path",
    )
    parser.add_argument(
        "--author", metavar="NAME", help="Author name for the PDF report"
    )
    parser.add_argument(
        "--child",
        action="store_true",
        help="Use child-friendly questionnaire (for 12 year olds)",
    )
    args = parser.parse_args()

    questions = load_questionnaire(args.test, child=args.child)
    responses = administer(questions, test_type=args.test)

    if args.pdf:
        export_pdf_report(
            questions, responses, args.pdf, author=args.author, test_type=args.test
        )


if __name__ == "__main__":
    main()
