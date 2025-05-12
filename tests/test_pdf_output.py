"""
Unit tests for plotting and PDF report generation modules for the Big Five PDF report feature.
"""

import io
import os
import pandas as pd
import pytest
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from modules import plotting, pdf_report


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
