"""Administer and score a short Big-Five questionnaire.

Usage
-----
$ python big_5.py            # runs an interactive CLI survey
$ python -m pytest           # run unit tests in /tests
"""

from typing import List
from modules.data_loader import load_questions_from_yaml
from modules.models import Item
from modules.cli import administer
import argparse
import io
import pandas as pd
from modules.plotting import create_bar_graph
from modules.pdf_report import generate_pdf_report
from modules.scoring import score_responses


# ————————————————————————————————————————————
# Questionnaire definition
# ————————————————————————————————————————————
QUESTIONS: List[Item] = load_questions_from_yaml("config/questionnaire.yaml")


def export_pdf_report(
    questions, responses, output_pdf_path, title="Big Five Results", author=None
):
    """
    Generate a PDF report with a bar graph of trait scores.
    """
    # Calculate scores
    scores = score_responses(responses, questions)
    # Prepare DataFrame for plotting
    data = pd.DataFrame(
        {
            "Category": list(scores.keys()),
            "Score": list(scores.values()),
        }
    )
    # Create bar graph image in memory
    img_buffer = io.BytesIO()
    create_bar_graph(data, img_buffer)
    # Generate PDF report
    generate_pdf_report(title, img_buffer, output_pdf_path, author=author)
    print(f"PDF report saved to {output_pdf_path}")


def main():
    parser = argparse.ArgumentParser(description="Big Five Questionnaire CLI")
    parser.add_argument(
        "--pdf",
        metavar="PDF_PATH",
        help="Export results as a PDF report to the given file path",
    )
    parser.add_argument(
        "--author", metavar="NAME", help="Author name for the PDF report"
    )
    args = parser.parse_args()

    responses = administer(QUESTIONS)
    if args.pdf:
        export_pdf_report(QUESTIONS, responses, args.pdf, author=args.author)


if __name__ == "__main__":
    main()
