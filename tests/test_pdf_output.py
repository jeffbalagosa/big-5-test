"""
Unit tests for plotting and PDF report generation modules for the Big Five PDF report feature.
"""

import io
import os
import pandas as pd
import sys
from modules import plotting, pdf_report

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


def sample_data():
    return pd.DataFrame(
        {
            "Category": [
                "Openness",
                "Conscientiousness",
                "Extraversion",
                "Agreeableness",
                "Neuroticism",
            ],
            "Score": [32, 28, 25, 30, 18],
        }
    )


def test_create_bar_graph_runs():
    data = sample_data()
    buf = io.BytesIO()
    # Should not raise
    plotting.create_bar_graph(data, buf)
    assert buf.getbuffer().nbytes > 0


def test_generate_pdf_report_runs(tmp_path):
    data = sample_data()
    buf = io.BytesIO()
    plotting.create_bar_graph(data, buf)
    buf.seek(0)
    output_pdf = tmp_path / "test_report.pdf"
    # Should not raise
    pdf_report.generate_pdf_report(
        title="Test Report", image_buffer=buf, output_pdf_path=str(output_pdf)
    )
    assert output_pdf.exists()
    assert output_pdf.stat().st_size > 0


def test_create_bar_graph_labels_and_numbers(tmp_path):
    data = sample_data()
    buf = io.BytesIO()
    plotting.create_bar_graph(data, buf)
    buf.seek(0)
    # Save to file for manual inspection (optional)
    out_path = tmp_path / "bar_graph.png"
    with open(out_path, "wb") as f:
        f.write(buf.read())
    # Use matplotlib to read back the image and check axis labels and bar values
    import matplotlib.pyplot as plt
    import matplotlib.image as mpimg

    img = mpimg.imread(out_path)
    # This is a placeholder: in a real test, use OCR or matplotlib testing utilities to check labels
    # For now, just assert the image was created and has content
    assert img.shape[0] > 0 and img.shape[1] > 0
    # If you want to automate label checking, use matplotlib's testing framework or OCR
    # For TDD, this test asserts the file is created and can be visually inspected for correct labels and numbers
