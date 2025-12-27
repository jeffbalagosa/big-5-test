import io
import os
import pandas as pd
from modules.plotting import create_bar_graph
from modules.pdf_report import generate_pdf_report


def generate_sample_big5_report():
    # Sample scores for Big Five (1-40 scale)
    scores = {
        "Extraversion": 32,
        "Agreeableness": 28,
        "Conscientiousness": 35,
        "Neuroticism": 12,
        "Openness": 38,
    }

    # Max scores (assuming 8 questions per trait * 5)
    max_scores = {trait: 40 for trait in scores}

    # Prepare DataFrame for plotting
    data = pd.DataFrame(
        {"Category": list(scores.keys()), "Score": list(scores.values())}
    )

    print("Generating sample Big Five report...")

    img_buffer = io.BytesIO()
    create_bar_graph(data, img_buffer, max_scores=max_scores)

    output_path = "big5_sample_report.pdf"
    generate_pdf_report(
        "Big Five Personality Traits",
        img_buffer,
        output_path,
        author="Sample Generator",
        subtitle="Sample Results for Demonstration",
    )

    print(f"Report generated: {os.path.abspath(output_path)}")


if __name__ == "__main__":
    generate_sample_big5_report()
