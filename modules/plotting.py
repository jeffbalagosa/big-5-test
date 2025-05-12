import matplotlib
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from matplotlib import rcParams

matplotlib.use("Agg")  # Use non-interactive backend for headless/test environments

"""
Plotting utilities for Big Five PDF report generation.
"""


def create_bar_graph(data, output_buffer, max_scores=None):
    """
    Generate and style a bar graph from the input data using matplotlib.
    Save the figure to the provided output_buffer (BytesIO).
    X-axis labels are the full trait names. Numbers above bars are the percentages.
    """
    # Set style
    rcParams.update(
        {
            "font.size": 12,
            "font.family": "sans-serif",
            "axes.titlesize": 16,
            "axes.labelsize": 14,
            "axes.edgecolor": "#333333",
            "axes.linewidth": 1.2,
            "xtick.labelsize": 12,
            "ytick.labelsize": 12,
            "figure.figsize": (6, 4),
            "figure.dpi": 300,
        }
    )
    fig, ax = plt.subplots()
    bars = ax.bar(
        data["Category"],
        data["Score"],
        color=["#4F81BD", "#A6A6A6", "#C0504D", "#9BBB59", "#8064A2"],
    )
    ax.set_xlabel("Trait")
    ax.set_ylabel("Score")
    ax.set_title("Big Five Personality Trait Scores")
    ax.set_ylim(0, max(data["Score"].max(), 5) + 2)
    ax.yaxis.set_major_locator(ticker.MaxNLocator(integer=True))
    # Ensure x-axis labels are centered and not rotated
    plt.setp(ax.get_xticklabels(), rotation=0, ha="center")
    # Annotate bars with percentages
    for bar, trait in zip(bars, data["Category"]):
        height = bar.get_height()
        if max_scores and trait in max_scores:
            pct = int(round((height / max_scores[trait]) * 100))
            label = f"{pct}%"
        else:
            label = f"{int(height)}"
        ax.annotate(
            label,
            xy=(bar.get_x() + bar.get_width() / 2, height),
            xytext=(0, 3),  # 3 points vertical offset
            textcoords="offset points",
            ha="center",
            va="bottom",
            fontsize=11,
        )
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    plt.tight_layout()
    plt.savefig(output_buffer, format="png", bbox_inches="tight")
    plt.close(fig)
