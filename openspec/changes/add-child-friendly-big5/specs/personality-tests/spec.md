# personality-tests Specification Delta

## ADDED Requirements

### Requirement: Child-Friendly Questionnaire Selection

The system SHALL allow users to select the child-friendly Big-5 questionnaire via a `--child` CLI flag.

#### Scenario: Default to adult questionnaire when no flag specified

- **WHEN** the user runs the application without the `--child` flag
- **THEN** the adult Big-5 questionnaire is administered

#### Scenario: Select child-friendly questionnaire

- **WHEN** the user runs the application with `--child`
- **THEN** the child-friendly Big-5 questionnaire is administered with age-appropriate language

#### Scenario: Child flag with MBTI shows coming soon

- **WHEN** the user runs the application with `--test mbti --child`
- **THEN** the system displays "Coming Soon" and exits

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
