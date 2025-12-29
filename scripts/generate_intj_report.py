import io
import os
from modules.plotting import create_mbti_bar_graph
from modules.pdf_report import generate_pdf_report
from modules.scoring import get_mbti_type


def generate_sample_intj_report():
    # Percentages for INTJ:
    # I: EI < 50 (e.g., 20)
    # N: SN < 50 (e.g., 30)
    # T: TF >= 50 (e.g., 85)
    # J: JP >= 50 (e.g., 70)
    percentages = {
        "EI": 20.0,  # Strong Introversion
        "SN": 30.0,  # Strong Intuition
        "TF": 85.0,  # Strong Thinking
        "JP": 70.0,  # Strong Judging
    }

    type_code = get_mbti_type(percentages)
    print(f"Generating report for type: {type_code}")

    img_buffer = io.BytesIO()
    create_mbti_bar_graph(percentages, img_buffer)

    output_path = "intj_sample_report.pdf"
    generate_pdf_report(
        f"MBTI Results: {type_code}", img_buffer, output_path, author="Sample Generator"
    )

    print(f"Report generated: {os.path.abspath(output_path)}")


if __name__ == "__main__":
    generate_sample_intj_report()
