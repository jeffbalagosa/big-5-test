import unittest
from unittest.mock import patch
import os
import sys
from main import main
from modules.data_loader import load_questionnaire

# Add project root to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestMBTIIntegration(unittest.TestCase):
    def setUp(self):
        self.pdf_path = "integration_test_mbti.pdf"
        if os.path.exists(self.pdf_path):
            os.remove(self.pdf_path)

    def tearDown(self):
        if os.path.exists(self.pdf_path):
            os.remove(self.pdf_path)

    @patch("builtins.input")
    def test_full_mbti_flow(self, mock_input):
        # Provide one response per question, then Enter to finish.
        questions = load_questionnaire("mbti", child=False)
        responses = ["5"] * len(questions) + [""]
        mock_input.side_effect = responses

        # Set sys.argv
        test_args = [
            "main.py",
            "--test",
            "mbti",
            "--pdf",
            self.pdf_path,
            "--author",
            "Integration Tester",
        ]
        with patch.object(sys, "argv", test_args):
            main()

        self.assertTrue(os.path.exists(self.pdf_path))
        self.assertTrue(os.path.getsize(self.pdf_path) > 0)


if __name__ == "__main__":
    unittest.main()
