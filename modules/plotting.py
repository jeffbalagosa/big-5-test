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
            "font.family": "tahoma",
            "axes.titlesize": 18,
            "axes.labelsize": 14,
            "axes.edgecolor": "#333333",
            "axes.linewidth": 1.2,
            "xtick.labelsize": 12,
            "ytick.labelsize": 12,
            "figure.figsize": (12, 4),  # Wider for better label spacing
            "figure.dpi": 300,
        }
    )
    fig, ax = plt.subplots()
    # Calculate max_scores if not provided
    if max_scores is None:
        max_scores = {
            trait: 40 for trait in data["Category"]
        }  # Default to 8 questions * 5 = 40
    # Calculate percentages for each trait
    percentages = [
        score / max_scores.get(trait, 1) * 100
        for score, trait in zip(data["Score"], data["Category"])
    ]
    # Plot percentages as bar heights
    bars = ax.bar(
        data["Category"],
        percentages,
        color=["#4F81BD", "#A6A6A6", "#C0504D", "#9BBB59", "#8064A2"],
    )
    ax.set_xlabel("Trait")
    ax.set_ylabel("Score (%)")
    ax.set_title("Big Five Personality Trait Scores")
    ax.set_ylim(0, max(100, max(percentages) + 10))
    ax.yaxis.set_major_locator(ticker.MaxNLocator(integer=True))
    # Ensure x-axis labels are centered and not rotated
    plt.setp(ax.get_xticklabels(), rotation=0, ha="center")
    # Annotate bars with percentages
    for bar, pct in zip(bars, percentages):
        height = bar.get_height()
        label = f"{int(round(pct))}%"
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
    plt.tight_layout(pad=2)
    plt.savefig(output_buffer, format="png", bbox_inches="tight")
    plt.close(fig)
