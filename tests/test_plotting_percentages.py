import io
import pandas as pd
import matplotlib.pyplot as plt
from modules import plotting


def test_bar_graph_percentages_and_labels():
    """
    Test that the bar heights match the calculated percentages and x labels are not squished.
    """
    data = pd.DataFrame(
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
    max_scores = {trait: 40 for trait in data["Category"]}
    expected_percentages = [score / 40 * 100 for score in data["Score"]]
    buf = io.BytesIO()
    # Patch plt.subplots to capture the axes
    fig_ax = {}
    orig_subplots = plt.subplots

    def fake_subplots(*args, **kwargs):
        fig, ax = orig_subplots(*args, **kwargs)
        fig_ax["fig"] = fig
        fig_ax["ax"] = ax
        return fig, ax

    plt.subplots = fake_subplots
    try:
        plotting.create_bar_graph(data, buf, max_scores=max_scores)
        ax = fig_ax["ax"]
        bars = ax.patches
        # Check bar heights match expected percentages
        heights = [bar.get_height() for bar in bars]
        for h, pct in zip(heights, expected_percentages):
            assert abs(h - pct) < 1e-6, f"Bar height {h} != expected {pct}"
        # Check x labels are not rotated and are centered
        for label in ax.get_xticklabels():
            assert label.get_rotation() == 0, "X label is rotated"
            assert label.get_ha() == "center", "X label is not centered"
        # Check figure width is at least 10 inches (not squished)
        fig = fig_ax["fig"]
        w, h = fig.get_size_inches()
        assert w >= 10, f"Figure width {w} too small, labels may be squished"
    finally:
        plt.subplots = orig_subplots
