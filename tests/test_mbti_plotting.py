import unittest
import io
from modules.plotting import create_mbti_bar_graph


class TestMBTIPlotting(unittest.TestCase):
    def test_create_mbti_bar_graph(self):
        percentages = {"EI": 75.0, "SN": 25.0, "TF": 50.0, "JP": 10.0}
        buffer = io.BytesIO()
        try:
            create_mbti_bar_graph(percentages, buffer)
            self.assertTrue(len(buffer.getvalue()) > 0)
        except Exception as e:
            self.fail(
                f"create_mbti_bar_graph raised {type(e).__name__} unexpectedly: {e}"
            )


if __name__ == "__main__":
    unittest.main()
