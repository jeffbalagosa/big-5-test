import unittest
import os
import io
from modules.pdf_report import generate_pdf_report
from modules.plotting import create_mbti_bar_graph


class TestMBTIPDF(unittest.TestCase):
    def test_generate_mbti_pdf(self):
        output_path = "test_mbti_report.pdf"
        percentages = {"EI": 75.0, "SN": 25.0, "TF": 50.0, "JP": 10.0}
        img_buffer = io.BytesIO()
        create_mbti_bar_graph(percentages, img_buffer)

        try:
            generate_pdf_report(
                "MBTI Test Report: ENTJ", img_buffer, output_path, author="Test Author"
            )
            self.assertTrue(os.path.exists(output_path))
            self.assertTrue(os.path.getsize(output_path) > 0)
        finally:
            if os.path.exists(output_path):
                os.remove(output_path)


if __name__ == "__main__":
    unittest.main()
