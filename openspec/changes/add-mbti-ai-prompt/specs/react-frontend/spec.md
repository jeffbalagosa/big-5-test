## MODIFIED Requirements

### Requirement: Big-5 Personality Analysis Prompt

The frontend SHALL display a copyable LLM prompt on the Big-5 results page that includes the user's actual test scores.

#### Scenario: Display prompt card for Big-5 results

- **WHEN** the user views Big-5 results
- **THEN** a card is displayed with a copyable LLM prompt containing the user's scores

#### Scenario: Prompt contains actual scores

- **WHEN** the prompt card is displayed
- **GIVEN** the user has Big-5 scores (e.g., Openness: 85, Conscientiousness: 72, etc.)
- **THEN** the prompt text includes these exact score values in a formatted section

#### Scenario: Prompt card is collapsible

- **WHEN** the prompt card is first displayed
- **THEN** it is collapsed by default
- **AND** clicking the header expands/collapses the prompt content

#### Scenario: Copy to clipboard functionality

- **WHEN** the user clicks the "Copy" button
- **THEN** the complete prompt text (with scores) is copied to the clipboard
- **AND** the button shows "Copied!" feedback for 2 seconds

#### Scenario: Prompt card styling

- **WHEN** the prompt card is displayed
- **THEN** it uses consistent styling with the results card:
  - White background
  - Rounded corners (16px border radius)
  - Box shadow
  - Tea Green border

## REMOVED Requirements

### Requirement: Big-5 Personality Analysis Prompt (scenario removal)

**Reason**: Moving "Hide prompt for MBTI results" scenario to a new dedicated requirement since MBTI now has its own prompt.
**Migration**: The scenario is superseded by the new MBTI Personality Analysis Prompt requirement.

## ADDED Requirements

### Requirement: MBTI Personality Analysis Prompt

The frontend SHALL display a copyable LLM prompt on the MBTI results page that includes the user's type code and dichotomy percentages.

#### Scenario: Display prompt card for MBTI results

- **WHEN** the user views MBTI results
- **THEN** a card is displayed with a copyable LLM prompt containing the user's type code and scores

#### Scenario: Prompt contains actual MBTI results

- **WHEN** the prompt card is displayed
- **GIVEN** the user has MBTI scores (e.g., type "INTJ", E: 35%, I: 65%, etc.)
- **THEN** the prompt text includes:
  - The 4-letter type code
  - All eight dichotomy percentages (E, I, S, N, T, F, J, P)

#### Scenario: MBTI prompt card is collapsible

- **WHEN** the prompt card is first displayed
- **THEN** it is collapsed by default
- **AND** clicking the header expands/collapses the prompt content

#### Scenario: MBTI copy to clipboard functionality

- **WHEN** the user clicks the "Copy" button
- **THEN** the complete prompt text (with type code and percentages) is copied to the clipboard
- **AND** the button shows "Copied!" feedback for 2 seconds

#### Scenario: MBTI prompt card styling

- **WHEN** the prompt card is displayed
- **THEN** it uses consistent styling with the results card:
  - White background
  - Rounded corners (16px border radius)
  - Box shadow
  - Tea Green border

#### Scenario: MBTI prompt content focus

- **WHEN** the LLM prompt is displayed
- **THEN** it instructs the LLM to analyze:
  - Cognitive function stack (dominant, auxiliary, tertiary, inferior)
  - Type dynamics and development
  - Behavioral predictions based on type
  - Strengths and potential blind spots
  - Actionable recommendations
