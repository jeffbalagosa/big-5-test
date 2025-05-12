import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


def test_bar_graph_is_landscape(monkeypatch):
    """Test that the bar graph is generated in landscape orientation (width > height)."""
    import io
    import matplotlib.pyplot as plt
    import pandas as pd
    from modules import plotting

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
    buf = io.BytesIO()
    fig_captured = {}

    def fake_subplots(*args, **kwargs):
        fig, ax = orig_subplots(*args, **kwargs)
        fig_captured["fig"] = fig
        return fig, ax

    orig_subplots = plt.subplots
    monkeypatch.setattr(plt, "subplots", fake_subplots)
    plotting.create_bar_graph(data, buf)
    fig = fig_captured["fig"]
    w, h = fig.get_size_inches()
    assert w > h, f"Figure is not landscape: width={w}, height={h}"


def test_bar_graph_labels_are_readable(monkeypatch):
    """Test that x-axis labels are not rotated and are readable (not overlapping)."""
    import io
    import matplotlib.pyplot as plt
    import pandas as pd
    from modules import plotting

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
    buf = io.BytesIO()
    labels_captured = {}

    def fake_setp(labels, **kwargs):
        labels_captured["rotation"] = kwargs.get("rotation", 0)
        labels_captured["ha"] = kwargs.get("ha", None)
        return orig_setp(labels, **kwargs)

    orig_setp = plt.setp
    monkeypatch.setattr(plt, "setp", fake_setp)
    plotting.create_bar_graph(data, buf)
    # Check that rotation is 0 and horizontal alignment is center
    assert labels_captured.get("rotation", 0) == 0, "X labels are rotated"
    assert (
        labels_captured.get("ha", None) == "center"
    ), "X labels are not horizontally centered"
