## ADDED Requirements
### Requirement: Questionnaire Progress Persistence
The frontend SHALL persist in-progress questionnaire state to localStorage and restore it on subsequent loads.

#### Scenario: Save in-progress state
- **GIVEN** the user has started a questionnaire
- **WHEN** the user answers a question or advances sets
- **THEN** the in-progress state (test type, mode, author name, answers, current set, answer order) is saved to localStorage

#### Scenario: Restore in-progress state
- **GIVEN** a saved in-progress state exists in localStorage
- **WHEN** the application loads
- **THEN** the questionnaire session is restored to the saved state

#### Scenario: Clear saved state on completion
- **GIVEN** an in-progress state is saved
- **WHEN** the user completes the questionnaire or resets the test
- **THEN** the saved in-progress state is removed from localStorage

### Requirement: Resume In-Progress Questionnaire
The frontend SHALL surface a resume prompt on the home page when a saved in-progress questionnaire state exists.

#### Scenario: Resume prompt shown
- **GIVEN** a saved in-progress questionnaire state exists
- **WHEN** the user visits the home page
- **THEN** a "Resume last test" call-to-action is visible
- **AND** selecting it navigates directly to the questionnaire and continues the saved session

#### Scenario: Resume prompt hidden
- **GIVEN** no saved in-progress questionnaire state exists
- **WHEN** the user visits the home page
- **THEN** no resume prompt is shown