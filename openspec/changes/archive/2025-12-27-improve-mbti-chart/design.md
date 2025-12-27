# Design: Diverging MBTI Bar Chart

## Architecture Overview

The change primarily affects the plotting logic in `modules/plotting.py`. The scoring logic remains the same, but the plotting function will transform the 0-100% percentages into a -100 to +100 clarity index.

## Data Transformation

The "clarity index" will be calculated as:
`clarity = (percent_right_pole - 50) * 2`

Where `percent_right_pole` is the percentage for the pole designated to be on the right side.

### Dichotomy Mapping

Based on the user's request:

| Dichotomy | Left Pole (Negative) | Right Pole (Positive) | Right Pole Source |
| --------- | -------------------- | --------------------- | ----------------- |
| I ↔ E     | Introversion (I)     | Extraversion (E)      | Pole 1 (E)        |
| N ↔ S     | Intuition (N)        | Sensing (S)           | Pole 1 (S)        |
| T ↔ F     | Thinking (T)         | Feeling (F)           | Pole 2 (F)        |
| J ↔ P     | Judging (J)          | Perceiving (P)        | Pole 2 (P)        |

_Note: In `modules/models.py`, `MBTI_DICHOTOMIES` defines Pole 1 as E, S, T, J. We will adjust the calculation accordingly to match the requested layout._

## Plotting Implementation

- **Library**: Matplotlib (already in use).
- **Chart Type**: Horizontal bar chart (`ax.barh`).
- **Axis**:
  - X-axis range: [-100, 100].
  - Center line: `ax.axvline(0, color='black', linewidth=2)`.
  - Ticks: Removed or simplified to focus on the poles.
- **Labels**:
  - Pole labels on the far left and far right of each bar.
  - Percentage labels (clarity index or absolute preference) near the bars.

## PDF Integration

The `modules/pdf_report.py` calls `create_mbti_bar_graph`. The signature of this function should remain compatible, or be updated if necessary. Since it currently takes `percentages` (0-100), we can keep that and do the transformation inside the plotting function.

## Testing Strategy

- **Unit Tests**: Update `tests/test_mbti_plotting.py` to verify the new chart structure (e.g., checking x-limits, presence of center line).
- **Visual Verification**: Generate a sample MBTI PDF and inspect the chart.
