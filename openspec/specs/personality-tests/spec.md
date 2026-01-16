# personality-tests Specification

## Purpose

Define requirements for personality test selection, administration, scoring, and reporting for Big Five and Myers-Briggs Type Indicator tests.
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
- **THEN** it uses a 6-point Likert scale without a neutral option: Strongly Disagree (1), Disagree (2), Slightly Disagree (3), Slightly Agree (4), Agree (5), Strongly Agree (6)

#### Scenario: MBTI reverse-scored items

- **WHEN** an MBTI item is marked as reverse-scored
- **THEN** the response is inverted (7 - response) before scoring

---

### Requirement: MBTI Scoring

The system SHALL calculate MBTI results as preference percentages for each dichotomy and determine a 4-letter type code using the shared scoring engine.

#### Scenario: Dichotomy preference calculation

- **WHEN** MBTI responses are scored using the shared scoring engine
- **THEN** each dichotomy shows a percentage indicating preference strength (e.g., "I: 65% / E: 35%")

#### Scenario: Type code determination

- **WHEN** MBTI responses are scored using the shared scoring engine
- **THEN** a 4-letter type code is generated based on the dominant pole of each dichotomy (e.g., "INTJ", "ENFP")

#### Scenario: Tie-breaking in dichotomy

- **WHEN** a dichotomy has equal scores for both poles (50/50)
- **THEN** the system assigns the first letter alphabetically (E over I, J over P, N over S, T over F)

#### Scenario: MBTI scoring scale range

- **WHEN** MBTI response percentages are calculated using the shared scoring engine
- **THEN** the scoring uses a 1-6 scale range (min score = count × 1, max score = count × 6) to convert raw sums to percentages

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

### Requirement: Child-Friendly Questionnaire Selection

The system SHALL allow users to select child-friendly questionnaires via a `--child` CLI flag for both Big-5 and MBTI tests.

#### Scenario: Default to adult questionnaire when no flag specified

- **WHEN** the user runs the application without the `--child` flag
- **THEN** the adult questionnaire is administered for the selected test type

#### Scenario: Select child-friendly Big-5 questionnaire

- **WHEN** the user runs the application with `--child` (or `--test big5 --child`)
- **THEN** the child-friendly Big-5 questionnaire is administered with age-appropriate language

#### Scenario: Select child-friendly MBTI questionnaire

- **WHEN** the user runs the application with `--test mbti --child`
- **THEN** the child-friendly MBTI questionnaire is administered with age-appropriate language

---

### Requirement: Child-Friendly Big-5 Questionnaire

The system SHALL provide a Big-5 questionnaire with language appropriate for 12-year-old test-takers.

#### Scenario: Child questionnaire structure

- **WHEN** the child-friendly Big-5 questionnaire is loaded
- **THEN** it contains the same number of items per trait as the adult version (10 items per trait, 50 total)

#### Scenario: Child questionnaire trait coverage

- **WHEN** the child-friendly Big-5 questionnaire is loaded
- **THEN** it measures all five OCEAN traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism

#### Scenario: Child questionnaire scoring compatibility

- **WHEN** a child-friendly questionnaire item is scored
- **THEN** it uses the same scoring logic as the adult version, including reverse-scoring where applicable

#### Scenario: Child questionnaire language

- **WHEN** a child-friendly questionnaire item is presented
- **THEN** the language is appropriate for a 12-year-old reading level, using concrete examples and avoiding abstract concepts

### Requirement: Child-Friendly MBTI Questionnaire

The system SHALL provide an MBTI questionnaire with language appropriate for 12-year-old test-takers.

#### Scenario: Child MBTI questionnaire structure

- **WHEN** the child-friendly MBTI questionnaire is loaded
- **THEN** it contains the same number of items per dichotomy as the adult version (10 items per dichotomy, 40 total)

#### Scenario: Child MBTI questionnaire dichotomy coverage

- **WHEN** the child-friendly MBTI questionnaire is loaded
- **THEN** it measures all four MBTI dichotomies: Extraversion/Introversion (E/I), Sensing/Intuition (S/N), Thinking/Feeling (T/F), and Judging/Perceiving (J/P)

#### Scenario: Child MBTI questionnaire scoring compatibility

- **WHEN** a child-friendly MBTI questionnaire item is scored
- **THEN** it uses the same 6-point scoring logic as the adult MBTI version, including reverse-scoring (7 - response) where applicable

#### Scenario: Child MBTI questionnaire language

- **WHEN** a child-friendly MBTI questionnaire item is presented
- **THEN** the language is appropriate for a 12-year-old reading level, using concrete examples and avoiding abstract concepts

#### Scenario: Child MBTI item format

- **WHEN** a child-friendly MBTI questionnaire item is presented
- **THEN** it uses the same 6-point Likert scale as the adult MBTI: Strongly Disagree (1), Disagree (2), Slightly Disagree (3), Slightly Agree (4), Agree (5), Strongly Agree (6)

### Requirement: Child-Friendly MBTI Frontend Support

The React frontend SHALL support child-friendly MBTI test selection and administration.

#### Scenario: Child MBTI test selection in frontend

- **WHEN** the user is on the test selection page
- **THEN** they can select the child-friendly MBTI test option

#### Scenario: Child MBTI questionnaire loading in frontend

- **WHEN** the user selects the child-friendly MBTI test
- **THEN** the frontend loads questions from `mbti-child.json`

#### Scenario: Child MBTI results in frontend

- **WHEN** the user completes the child-friendly MBTI test in the frontend
- **THEN** the results are calculated and displayed identically to the adult MBTI test

### Requirement: Shared Scoring Engine

The system SHALL use a single JavaScript-based scoring implementation for both the React frontend and Python CLI to ensure consistency and eliminate code duplication.

#### Scenario: React app uses shared scoring library

- **WHEN** the React app needs to score Big-5 or MBTI responses
- **THEN** it imports and calls the scoring functions from `lib/scoring/index.js`

#### Scenario: Python CLI uses shared scoring library via Node.js

- **WHEN** the Python CLI needs to score Big-5 or MBTI responses
- **THEN** it executes the Node.js scoring library via subprocess with JSON input/output

#### Scenario: Identical results across interfaces

- **WHEN** the same questionnaire responses are scored in both the React app and Python CLI
- **THEN** both interfaces produce identical trait scores and type codes

### Requirement: Node.js Scoring Library

The system SHALL provide a standalone Node.js scoring library that implements Big-5 and MBTI scoring algorithms.

#### Scenario: Big-5 scoring function

- **WHEN** the scoring library receives Big-5 responses and question metadata
- **THEN** it returns trait percentages for Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism

#### Scenario: MBTI scoring function

- **WHEN** the scoring library receives MBTI responses and question metadata
- **THEN** it returns dichotomy percentages and a 4-letter type code

#### Scenario: Reverse scoring support

- **WHEN** a question is marked as reverse-scored in the metadata
- **THEN** the scoring library inverts the response value using (maxVal + 1 - response) formula

#### Scenario: Likert scale flexibility

- **WHEN** scoring Big-5 responses
- **THEN** the library uses maxVal=5 (5-point Likert scale)

- **WHEN** scoring MBTI responses
- **THEN** the library uses maxVal=6 (6-point Likert scale)

#### Scenario: Response validation

- **WHEN** the scoring library receives an invalid response (not an integer within 1 to maxVal)
- **THEN** it skips that response in scoring calculations and treats it as unanswered

### Requirement: Scoring CLI Interface

The system SHALL provide a command-line interface for the Node.js scoring library that accepts JSON input via stdin and outputs JSON results via stdout.

#### Scenario: CLI accepts JSON input

- **WHEN** the scoring CLI is invoked with `node lib/scoring/cli.js`
- **THEN** it reads JSON from stdin containing answers, questions, and test_type fields

#### Scenario: CLI outputs JSON results

- **WHEN** the scoring CLI completes processing
- **THEN** it writes a JSON object to stdout containing the calculated scores

#### Scenario: CLI error reporting

- **WHEN** the scoring CLI encounters an error (invalid input, missing fields, etc.)
- **THEN** it writes a JSON error object to stdout with an "error" field describing the issue

### Requirement: Python-Node.js Bridge

The Python CLI SHALL integrate with the Node.js scoring library via a bridge module that handles subprocess communication.

#### Scenario: Bridge converts Python data to JSON

- **WHEN** the Python CLI needs to score responses
- **THEN** the bridge module converts Python data structures (responses, questionnaire items) to JSON format

#### Scenario: Bridge invokes Node.js subprocess

- **WHEN** the bridge module has prepared JSON input
- **THEN** it spawns a Node.js subprocess running `lib/scoring/cli.js` and passes JSON via stdin

#### Scenario: Bridge parses JSON results

- **WHEN** the Node.js subprocess completes successfully
- **THEN** the bridge module parses the JSON output from stdout and returns Python data structures

#### Scenario: Bridge handles Node.js errors

- **WHEN** the Node.js subprocess exits with non-zero status or returns an error object
- **THEN** the bridge module raises a Python exception with a descriptive error message

#### Scenario: Bridge validates Node.js availability

- **WHEN** the Python CLI starts and needs to score responses
- **THEN** the bridge module checks that Node.js is available in the system PATH and provides a helpful error if missing

