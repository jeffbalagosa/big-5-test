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
    Generate a horizontal diverging bar graph for MBTI dichotomies.
    Each bar shows preference between two poles, centered at 0.
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

    # Define which pole is on the right (positive side)
    # Based on design: E, S, F, P are on the right
    right_pole_info = {
        "EI": {"name": "Extraversion", "letter": "E", "left_letter": "I"},
        "SN": {"name": "Sensing", "letter": "S", "left_letter": "N"},
        "TF": {"name": "Feeling", "letter": "F", "left_letter": "T"},
        "JP": {"name": "Perceiving", "letter": "P", "left_letter": "J"},
    }

    plot_data = []
    for d in MBTI_DICHOTOMIES:
        pole1, pole2 = MBTI_DICHOTOMIES[d]
        info = right_pole_info[d]
        right_pole = info["name"]
        
        # Calculate percentage for the right pole
        # percentages[d] is always for pole1 (E, S, T, J)
        if pole1 == right_pole:
            pct_right = percentages[d]
        else:
            pct_right = 100 - percentages[d]

        # Clarity index: -100 to 100
        clarity = (pct_right - 50) * 2
        
        plot_data.append({
            "dichotomy": d,
            "clarity": clarity,
            "label": f"{info['left_letter']} — {info['letter']}",
            "left_letter": info["left_letter"],
            "right_letter": info["letter"]
        })

    # Sort by absolute clarity descending (strongest preference at top)
    plot_data.sort(key=lambda x: abs(x["clarity"]), reverse=True)
    
    # Reverse for plotting (matplotlib plots from bottom up)
    plot_data = plot_data[::-1]

    labels = [d["label"] for d in plot_data]
    clarity_indices = [d["clarity"] for d in plot_data]

    # Plot horizontal bars
    colors = ["#4F81BD" if c >= 0 else "#C0504D" for c in clarity_indices]
    bars = ax.barh(labels, clarity_indices, color=colors, height=0.6)

    # Add a bold vertical line at 0
    ax.axvline(0, color="black", linewidth=2)

    ax.set_xlim(-110, 110)
    ax.set_xlabel("Clarity Index (-100 to 100)")
    ax.set_title("MBTI Personality Preferences")

    # Add clarity values and pole letters
    for i, data in enumerate(plot_data):
        clarity = data["clarity"]
        abs_clarity = abs(int(round(clarity)))
        
        # Determine which letter to show based on clarity
        letter = data["right_letter"] if clarity >= 0 else data["left_letter"]
        label = f"{letter}: {abs_clarity}"

        # Position label inside or near the bar
        if clarity >= 0:
            ax.annotate(
                label,
                xy=(clarity, i),
                xytext=(5 if clarity < 90 else -5, 0),
                textcoords="offset points",
                ha="left" if clarity < 90 else "right",
                va="center",
                fontsize=10,
                fontweight="bold",
                color="white" if clarity > 30 else "black",
            )
        else:
            ax.annotate(
                label,
                xy=(clarity, i),
                xytext=(-5 if clarity > -90 else 5, 0),
                textcoords="offset points",
                ha="right" if clarity > -90 else "left",
                va="center",
                fontsize=10,
                fontweight="bold",
                color="white" if clarity < -30 else "black",
            )

    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_visible(False)
    
    # Set x-ticks to show the scale
    ax.set_xticks([-100, -50, 0, 50, 100])
    
    # Add a small legend/explanation at the bottom
    ax.text(0.5, -0.18, "Left = I, N, T, J | Right = E, S, F, P", 
            transform=ax.transAxes, ha="center", fontsize=10, 
            bbox=dict(boxstyle="round", facecolor="white", edgecolor="gray", alpha=0.8))

    plt.tight_layout()
    plt.savefig(output_buffer, format="png", bbox_inches="tight")
    plt.close(fig)
