# Spec Delta: React Frontend

## REMOVED Requirements

### Requirement: Big-5 Trait Descriptions Display

**Reason**: Replaced with interactive LLM prompt that provides more actionable value than static trait definitions.

**Migration**: Users can still learn about traits through the LLM analysis prompt output.

## ADDED Requirements

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

#### Scenario: Hide prompt for MBTI results

- **WHEN** the user views MBTI results
- **THEN** the personality analysis prompt card is NOT displayed
