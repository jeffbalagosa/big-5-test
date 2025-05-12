"""
Plotting utilities for Big Five PDF report generation.
"""

import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend for headless/test environments

import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from matplotlib import rcParams


def create_bar_graph(data, output_buffer):
    """
    Generate and style a bar graph from the input data using matplotlib.
    Save the figure to the provided output_buffer (BytesIO).
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
    # Annotate bars
    for bar in bars:
        height = bar.get_height()
        ax.annotate(
            f"{int(height)}",
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
