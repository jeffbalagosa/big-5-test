# personality-tests Spec Delta

## ADDED Requirements

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

## MODIFIED Requirements

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
