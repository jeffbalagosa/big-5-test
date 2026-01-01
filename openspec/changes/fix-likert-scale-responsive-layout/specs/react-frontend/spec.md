# react-frontend Spec Delta

## MODIFIED Requirements

### Requirement: Questionnaire Interface

The frontend SHALL display questions one at a time with a Likert scale response mechanism.

#### Scenario: Likert scale desktop layout

- **GIVEN** the viewport width is 768px or greater
- **WHEN** a question is displayed
- **THEN** the five Likert scale response buttons are arranged in a single horizontal row without wrapping or overflow

#### Scenario: Likert scale mobile layout

- **GIVEN** the viewport width is less than 768px
- **WHEN** a question is displayed
- **THEN** the five Likert scale response buttons are arranged in a single vertical column at full available width
