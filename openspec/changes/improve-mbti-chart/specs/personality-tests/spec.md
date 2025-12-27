# Capability: Personality Tests

## MODIFIED Requirements

### Requirement: MBTI PDF Report

The system SHALL generate PDF reports for MBTI results with appropriate visualization.

#### Scenario: MBTI PDF generation

- **WHEN** the user requests a PDF with `--pdf` after completing MBTI
- **THEN** a PDF is generated with:
  - Title indicating "Myers-Briggs Type Indicator Results"
  - The 4-letter type code
  - A **diverging bar graph** showing dichotomy preferences centered at 0
  - Author name if provided via `--author`

#### Scenario: MBTI Diverging Chart Format

- **WHEN** the MBTI bar graph is generated
- **THEN** it SHALL:
  - Use a clarity index from -100 to +100
  - Center the bars at 0 with a bold centerline
  - Display the following pole pairs (Left vs Right):
    - Introversion (I) vs Extraversion (E)
    - Intuition (N) vs Sensing (S)
    - Thinking (T) vs Feeling (F)
    - Judging (J) vs Perceiving (P)
  - Show bars extending left for the left pole and right for the right pole
