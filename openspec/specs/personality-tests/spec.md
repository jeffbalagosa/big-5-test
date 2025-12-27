# personality-tests Specification

## Purpose
TBD - created by archiving change add-myers-briggs-test. Update Purpose after archive.
## Requirements
### Requirement: Test Type Selection

The system SHALL allow users to select which personality test to take via a `--test` CLI parameter.

#### Scenario: Default to Big Five when no test specified

- **WHEN** the user runs the application without `--test` parameter
- **THEN** the Big Five (OCEAN) questionnaire is administered

#### Scenario: Select Big Five explicitly

- **WHEN** the user runs the application with `--test big5`
- **THEN** the Big Five (OCEAN) questionnaire is administered

#### Scenario: Select Myers-Briggs test

- **WHEN** the user runs the application with `--test mbti`
- **THEN** the Myers-Briggs Type Indicator questionnaire is administered

#### Scenario: Invalid test type

- **WHEN** the user runs the application with `--test invalid`
- **THEN** the system displays an error message listing valid test types

---

### Requirement: MBTI Questionnaire

The system SHALL provide a Myers-Briggs Type Indicator questionnaire with items measuring four dichotomies.

#### Scenario: MBTI questionnaire structure

- **WHEN** the MBTI questionnaire is loaded
- **THEN** it contains items for all four dichotomies: Extraversion/Introversion (E/I), Sensing/Intuition (S/N), Thinking/Feeling (T/F), and Judging/Perceiving (J/P)

#### Scenario: MBTI item format

- **WHEN** an MBTI questionnaire item is presented
- **THEN** it follows the same Likert scale format (1-5) as the Big Five questionnaire

#### Scenario: MBTI reverse-scored items

- **WHEN** an MBTI item is marked as reverse-scored
- **THEN** the response is inverted (6 - response) before scoring

---

### Requirement: MBTI Scoring

The system SHALL calculate MBTI results as preference percentages for each dichotomy and determine a 4-letter type code.

#### Scenario: Dichotomy preference calculation

- **WHEN** MBTI responses are scored
- **THEN** each dichotomy shows a percentage indicating preference strength (e.g., "I: 65% / E: 35%")

#### Scenario: Type code determination

- **WHEN** MBTI responses are scored
- **THEN** a 4-letter type code is generated based on the dominant pole of each dichotomy (e.g., "INTJ", "ENFP")

#### Scenario: Tie-breaking in dichotomy

- **WHEN** a dichotomy has equal scores for both poles (50/50)
- **THEN** the system assigns the first letter alphabetically (E over I, J over P, N over S, T over F)

---

### Requirement: MBTI CLI Results Display

The system SHALL display MBTI results in a clear, formatted output showing the type code and preference strengths.

#### Scenario: MBTI results display

- **WHEN** the user completes the MBTI questionnaire
- **THEN** the system displays:
  - The 4-letter type code prominently
  - Each dichotomy with percentage breakdown
  - A brief description of the type (optional enhancement)

---

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

