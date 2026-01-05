# react-frontend Spec Delta

## MODIFIED Requirements

### Requirement: Questionnaire Interface

The frontend SHALL display questions in sets of up to 3 at a time with a Likert scale response mechanism and auto-advance behavior.

#### Scenario: Display question set

- **WHEN** the user is on the questionnaire page
- **THEN** up to 3 questions are displayed simultaneously in a vertical stack
- **AND** each question shows its absolute position (e.g., "Question 7 of 50")
- **AND** each question has its own Likert scale response buttons

#### Scenario: Partial final set

- **GIVEN** the total question count is not evenly divisible by 3
- **WHEN** the user reaches the final set
- **THEN** only the remaining questions are displayed (1 or 2 questions)

#### Scenario: Answer question within set

- **WHEN** the user selects a Likert scale value for a question
- **THEN** the answer is recorded
- **AND** a visual indicator shows the question is answered (e.g., subtle highlight or checkmark)
- **AND** the user remains on the current set until all questions are answered

#### Scenario: Auto-advance to next set

- **GIVEN** the user is not on the final set
- **WHEN** the user answers the last unanswered question in the current set
- **THEN** the app immediately advances to the next set of questions
- **AND** no explicit "Next" button is required

#### Scenario: Auto-advance to results

- **GIVEN** the user is on the final set of questions
- **WHEN** the user answers the last unanswered question
- **THEN** the app navigates to the results page

#### Scenario: Undo within current set

- **GIVEN** the user has answered at least one question in the current set
- **WHEN** the user clicks "Undo"
- **THEN** the most recently answered question's response is removed
- **AND** the user remains on the current set

#### Scenario: Undo across set boundary

- **GIVEN** the user has not answered any questions in the current set
- **AND** a previous set exists with answers
- **WHEN** the user clicks "Undo"
- **THEN** the app returns to the previous set
- **AND** the most recently answered question's response is removed

#### Scenario: Progress indication for sets

- **WHEN** the user is on the questionnaire page
- **THEN** the progress bar reflects completed sets
- **AND** individual question cards show absolute question numbers

#### Scenario: Likert scale desktop layout (unchanged)

- **GIVEN** the viewport width is 768px or greater
- **WHEN** questions are displayed
- **THEN** each question's Likert scale response buttons are arranged in a single horizontal row without wrapping or overflow

#### Scenario: Likert scale mobile layout (unchanged)

- **GIVEN** the viewport width is less than 768px
- **WHEN** questions are displayed
- **THEN** each question's Likert scale response buttons are arranged in a single vertical column at full available width

#### Scenario: Mobile multi-question scroll

- **GIVEN** the viewport width is less than 768px
- **WHEN** 3 questions are displayed
- **THEN** the questions stack vertically and the user may scroll to view all questions
