# Proposal: Improve MBTI Chart Visualization

## Problem

The current MBTI chart in the PDF report uses a standard horizontal bar chart (0-100%) which doesn't intuitively represent the "either/or" nature of the four dichotomies. It requires the user to interpret 50% as the neutral point, which is less clear than a centered diverging chart.

## Proposed Solution

Replace the current MBTI bar chart with a diverging (bipolar) bar chart centered at 0. This chart will:

- Use a "clarity index" ranging from -100 to +100.
- Center the bars at 0 (the neutral point).
- Extend bars to the left for one pole and to the right for the other.
- Clearly label the poles on each side.

## Impact

- **User Experience**: Improved clarity and readability of MBTI results in PDF reports.
- **Visual Consistency**: Better alignment with standard MBTI reporting practices.
- **Codebase**: Updates to `modules/plotting.py` and potentially `modules/pdf_report.py`.

## Alternatives Considered

- **Stacked Bar Chart**: Could show both poles in one bar, but diverging bars are better for showing "preference strength" from a neutral center.
- **Radar Chart**: Not well-suited for dichotomies.
