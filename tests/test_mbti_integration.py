import unittest
from unittest.mock import patch
import os
import sys

# Add project root to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import main


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
        # Mock 40 responses (all 5s for E, S, T, J)
        # config/mbti.yaml has 40 questions.
        # We need to provide 40 numbers + "done" or empty string
        responses = ["5"] * 40 + [""]
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
