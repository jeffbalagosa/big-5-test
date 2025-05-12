import io
import os
import tempfile
import pandas as pd
from modules import plotting, pdf_report
from pypdf import PdfReader


def test_pdf_is_landscape_and_graph_not_squished():
    """
    Test that the generated PDF is landscape and the embedded bar graph is not squished.
    """
    # Create bar graph image buffer
    data = pd.DataFrame(
        {
            "Category": [
                "Openness",
                "Conscientiousness",
                "Extraversion",
                "Agreeableness",
                "Neuroticism",
            ],
            "Score": [32, 28, 25, 18, 30],
        }
    )
    buf = io.BytesIO()
    plotting.create_bar_graph(data, buf)

    # Generate PDF to a temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_pdf:
        pdf_report.generate_pdf_report(
            title="Test Report",
            image_buffer=buf,
            output_pdf_path=tmp_pdf.name,
            author="UnitTest",
            subtitle="Landscape Test",
        )
        tmp_pdf_path = tmp_pdf.name

    # Check PDF page orientation using pypdf
    reader = PdfReader(tmp_pdf_path)
    page = reader.pages[0]
    width = float(page.mediabox.width)
    height = float(page.mediabox.height)
    assert width > height, f"PDF page is not landscape: width={width}, height={height}"

    # Clean up temp file
    os.remove(tmp_pdf_path)
