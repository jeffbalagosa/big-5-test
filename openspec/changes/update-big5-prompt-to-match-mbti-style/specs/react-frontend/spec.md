# react-frontend Spec Delta

## MODIFIED Requirements

### Requirement: Big-5 Personality Analysis Prompt

The frontend SHALL display a copyable LLM prompt on the Big-5 results page that includes the user's actual test scores and uses a consistent style with the MBTI prompt.

#### Scenario: Display prompt card for Big-5 results

- **WHEN** the user views Big-5 results
- **THEN** a card titled "Big-5 Analysis AI Prompt" is displayed with a copyable LLM prompt containing the user's scores

#### Scenario: Prompt uses expert consultant tone

- **WHEN** the prompt card is displayed
- **THEN** the prompt text uses an "Expert Consultant" tone (professional, insightful, encouraging)
- **AND** avoids intimidating language like "dossier" or "forensic analyst"

#### Scenario: Prompt does not require external capabilities

- **WHEN** the prompt text is generated
- **THEN** it does NOT request internet browsing, external sources, or citations
- **AND** it works with any standard LLM interface

#### Scenario: Prompt contains Big-5 specific analysis sections

- **WHEN** the prompt card is displayed
- **THEN** the prompt includes:
  - Executive Summary section
  - Trait-by-trait analysis section
  - Trait interactions/dynamics section
  - Behavioral insights (work, relationships, stress)
  - Actionable growth recommendations
  - Follow-up questions

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
