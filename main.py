"""Administer and score a short Big-Five questionnaire.

Usage
-----
$ python big_5.py            # runs an interactive CLI survey
$ python -m pytest           # run unit tests in /tests
"""

from typing import List
from modules.data_loader import load_questionnaire
from modules.models import Item
from modules.cli import administer
import argparse
import io
import pandas as pd
from modules.plotting import create_bar_graph, create_mbti_bar_graph
from modules.pdf_report import generate_pdf_report
from modules.scoring import score_responses, score_mbti_responses, get_mbti_type


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
        percentages = score_mbti_responses(responses, questions)
        type_code = get_mbti_type(percentages)
        title = f"MBTI Results: {type_code}"
        create_mbti_bar_graph(percentages, img_buffer)
    else:
        # Calculate scores
        scores = score_responses(responses, questions)
        # Prepare DataFrame for plotting
        data = pd.DataFrame(
            {
                "Category": list(scores.keys()),
                "Score": list(scores.values()),
            }
        )
        # Calculate max scores for each trait
        max_scores = {
            trait: len([q for q in questions if q.trait == trait]) * 5
            for trait in scores
        }
        # Create bar graph image in memory (with percentages)
        create_bar_graph(data, img_buffer, max_scores=max_scores)

    # Generate PDF report
    generate_pdf_report(title, img_buffer, output_pdf_path, author=author)
    print(f"PDF report saved to {output_pdf_path}")


def main():
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
