# personality-tests Specification Delta

## MODIFIED Requirements

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

## ADDED Requirements

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
- **THEN** it uses the same scoring logic as the adult version, including reverse-scoring where applicable

#### Scenario: Child MBTI questionnaire language

- **WHEN** a child-friendly MBTI questionnaire item is presented
- **THEN** the language is appropriate for a 12-year-old reading level, using concrete examples and avoiding abstract concepts

---

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

---

## REMOVED Requirements

### Requirement: Child flag with MBTI shows coming soon

**Reason**: The child-friendly MBTI questionnaire is now implemented.

**Migration**: Users who previously saw "Coming Soon" will now be able to take the child-friendly MBTI test.
