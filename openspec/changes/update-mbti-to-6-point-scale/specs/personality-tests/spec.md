## MODIFIED Requirements

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

#### Scenario: MBTI scoring scale range

- **WHEN** MBTI response percentages are calculated
- **THEN** the scoring uses a 1-6 scale range (min score = count × 1, max score = count × 6) to convert raw sums to percentages

---

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
