import unittest
import io
from unittest.mock import patch, MagicMock
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

    @patch("matplotlib.pyplot.subplots")
    def test_mbti_plotting_logic(self, mock_subplots):
        mock_fig = MagicMock()
        mock_ax = MagicMock()
        mock_subplots.return_value = (mock_fig, mock_ax)

        percentages = {"EI": 75.0, "SN": 25.0, "TF": 50.0, "JP": 10.0}
        buffer = io.BytesIO()

        create_mbti_bar_graph(percentages, buffer)

        # Verify x-axis limits are set for diverging chart
        mock_ax.set_xlim.assert_called_with(-110, 110)

        # Verify centerline at 0
        mock_ax.axvline.assert_called_with(0, color="black", linewidth=2)

        # Verify barh was called with 4 dichotomies
        self.assertEqual(mock_ax.barh.call_count, 1)
        args, kwargs = mock_ax.barh.call_args
        labels, clarity_indices = args
        self.assertEqual(len(clarity_indices), 4)

        # Check clarity index calculations
        # EI: 75% E -> (75-50)*2 = 50
        # SN: 25% S -> (25-50)*2 = -50
        # TF: 50% T -> 100-50=50% F -> (50-50)*2 = 0
        # JP: 10% J -> 100-10=90% P -> (90-50)*2 = 80
        # Note: dichotomies are reversed for top-to-bottom: JP, TF, SN, EI
        expected_clarity = [80, 0, -50, 50]
        for i, val in enumerate(expected_clarity):
            self.assertAlmostEqual(clarity_indices[i], val)


if __name__ == "__main__":
    unittest.main()
