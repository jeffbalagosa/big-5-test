import matplotlib
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from matplotlib import rcParams
from modules.models import MBTI_DICHOTOMIES

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


def create_mbti_bar_graph(percentages, output_buffer):
    """
    Generate a horizontal bar graph for MBTI dichotomies.
    Each bar shows preference between two poles.
    """
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
            "figure.figsize": (10, 6),
            "figure.dpi": 300,
        }
    )

    fig, ax = plt.subplots()

    dichotomies = list(MBTI_DICHOTOMIES.keys())[::-1]  # Reverse for top-to-bottom
    labels = []
    vals = []

    for d in dichotomies:
        pole1, pole2 = MBTI_DICHOTOMIES[d]
        labels.append(f"{pole1} vs {pole2}")
        vals.append(percentages[d])

    # Plot horizontal bars
    bars = ax.barh(labels, vals, color="#4F81BD", height=0.6)

    # Add a vertical line at 50%
    ax.axvline(50, color="black", linestyle="--", alpha=0.5)

    ax.set_xlim(0, 100)
    ax.set_xlabel("Preference Strength (%)")
    ax.set_title("MBTI Personality Preferences")

    # Add pole labels on the ends
    for i, d in enumerate(dichotomies):
        pole1, pole2 = MBTI_DICHOTOMIES[d]
        ax.text(-2, i, pole2, ha="right", va="center", fontweight="bold")
        ax.text(102, i, pole1, ha="left", va="center", fontweight="bold")

        # Annotate with percentage
        pct = percentages[d]
        label = (
            f"{int(round(pct))}% {pole1}"
            if pct >= 50
            else f"{int(round(100 - pct))}% {pole2}"
        )
        ax.annotate(
            label,
            xy=(pct, i),
            xytext=(5 if pct < 90 else -5, 0),
            textcoords="offset points",
            ha="left" if pct < 90 else "right",
            va="center",
            fontsize=10,
            color="white" if 10 < pct < 90 else "black",
        )

    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_visible(False)
    ax.get_yaxis().set_visible(False)

    plt.tight_layout()
    plt.savefig(output_buffer, format="png", bbox_inches="tight")
    plt.close(fig)
