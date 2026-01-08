# react-frontend Specification

## Purpose

Provide a web-based user interface for administering personality questionnaires, displaying results, and generating PDF reports.
## Requirements
### Requirement: Navigation Drawer Layout

The frontend SHALL provide a persistent left-side navigation sidebar for accessing all application sections.

#### Scenario: Persistent sidebar display (desktop)

- **WHEN** the user loads the application on a viewport >= 768px
- **THEN** a navigation sidebar is visible on the left side in either collapsed or expanded state
- **AND** the sidebar does not overlay the main content

#### Scenario: Collapsed sidebar state

- **WHEN** the sidebar is in collapsed state
- **THEN** only navigation icons are visible (no labels)
- **AND** the sidebar width is approximately 60px
- **AND** a toggle button is visible to expand the sidebar

#### Scenario: Expanded sidebar state

- **WHEN** the sidebar is in expanded state
- **THEN** navigation icons and labels are visible
- **AND** a toggle button is visible to collapse the sidebar

#### Scenario: Sidebar resize (expanded)

- **WHEN** the sidebar is expanded
- **AND** the user drags the right edge of the sidebar
- **THEN** the sidebar width adjusts within the range of 200px to 400px

#### Scenario: Sidebar state persistence

- **WHEN** the user changes the sidebar collapsed/expanded state or width
- **THEN** the preference is saved to localStorage
- **AND** the preference is restored on subsequent page loads

#### Scenario: Navigation sidebar mobile collapse

- **WHEN** the viewport width is less than 768px
- **THEN** the sidebar is hidden by default
- **AND** a hamburger menu button is visible to open it as an overlay

#### Scenario: Navigation sidebar mobile overlay

- **WHEN** the user clicks the hamburger menu icon on mobile
- **THEN** the navigation sidebar slides in from the left as an overlay
- **AND** clicking outside the sidebar closes it

#### Scenario: Global background image

- **WHEN** the application is rendered
- **THEN** a background image `window_background.png` is visible behind the main content
- **AND** a semi-transparent overlay is applied to ensure text readability

### Requirement: Test Selection Interface

The frontend SHALL allow users to configure test options before starting a questionnaire.

#### Scenario: Select test type

- **WHEN** the user navigates to the test selection page
- **THEN** they can choose between "Big-5 (OCEAN)" and "Myers-Briggs (MBTI)" test types

#### Scenario: Enable child-friendly mode for Big-5

- **WHEN** the user selects "Big-5 (OCEAN)" test type
- **THEN** a "Child-Friendly" checkbox is enabled and selectable

#### Scenario: Disable child-friendly mode for MBTI

- **WHEN** the user selects "Myers-Briggs (MBTI)" test type
- **THEN** the "Child-Friendly" checkbox is disabled with a tooltip "Coming Soon"

#### Scenario: Enter author name

- **WHEN** the user is on the test selection page
- **THEN** they can optionally enter an author name for the PDF report

#### Scenario: Start test with configuration

- **WHEN** the user clicks "Start Test"
- **THEN** the questionnaire begins with the selected options applied

---

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

### Requirement: Big-5 Results Display

The frontend SHALL display Big-5 results with percentage scores and a bar chart visualization.

#### Scenario: Display Big-5 trait scores

- **WHEN** the user completes the Big-5 questionnaire
- **THEN** the results page shows each trait (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) with a percentage score

#### Scenario: Display Big-5 bar chart

- **WHEN** the user views Big-5 results
- **THEN** a horizontal bar chart visualizes each trait's percentage score

---

### Requirement: MBTI Results Display

The frontend SHALL display MBTI results with the 4-letter type code and preference percentages.

#### Scenario: Display MBTI type code

- **WHEN** the user completes the MBTI questionnaire
- **THEN** the 4-letter type code (e.g., "INTJ") is displayed prominently

#### Scenario: Display MBTI dichotomy breakdown

- **WHEN** the user views MBTI results
- **THEN** each dichotomy shows both poles with their respective percentages (e.g., "I: 65% / E: 35%")

#### Scenario: Display MBTI diverging chart

- **WHEN** the user views MBTI results
- **THEN** a diverging bar chart shows preference clarity from -100 to +100

---

### Requirement: PDF Export from Frontend

The frontend SHALL allow users to download their results as a PDF report.

#### Scenario: Download PDF button

- **WHEN** the user is on the results page
- **THEN** a "Download PDF" button is visible

#### Scenario: Generate PDF with results

- **WHEN** the user clicks "Download PDF"
- **THEN** a PDF file is generated containing:
  - Title with test type and type code (for MBTI)
  - Author name (if provided)
  - Score visualization chart
  - Trait/dichotomy breakdown

---

### Requirement: Color Scheme

The frontend SHALL use the project-defined color scheme consistently.

#### Scenario: Apply color scheme

- **WHEN** the application renders
- **THEN** the following colors are used:
  - Tea Green (#bdd9bf): Progress indicators, success states
  - Charcoal Blue (#2e4052): Navigation drawer background, headings
  - Golden Pollen (#ffc857): Primary buttons, highlights
  - White (#ffffff): Content background
  - Midnight Violet (#412234): Footer, secondary accents

---

### Requirement: Responsive Design

The frontend SHALL be usable on both desktop and mobile devices.

#### Scenario: Mobile viewport layout

- **WHEN** the viewport width is less than 768px
- **THEN** the navigation drawer is hidden and accessible via hamburger menu

#### Scenario: Touch-friendly targets

- **WHEN** viewing on a touch device
- **THEN** all interactive elements have a minimum tap target of 44x44 pixels

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

### Requirement: About Page

The frontend SHALL provide an About page with information about the application, test types, privacy, and AI integration.

#### Scenario: Display About page content

- **WHEN** the user navigates to `/about`
- **THEN** the About page displays:
  - A hero section with the application title and purpose
  - A callout highlighting the AI-integration design (copy prompt to LLM)
  - An overview of the Big Five (OCEAN) personality model
  - An overview of the Myers-Briggs (MBTI) personality model
  - A privacy notice stating all data stays local
  - Technical acknowledgements

#### Scenario: About page visual consistency

- **WHEN** the About page is displayed
- **THEN** it uses the same card-based styling as the HomePage
- **AND** follows the application's color theme (COLORS from theme.ts)

#### Scenario: About page responsive layout

- **WHEN** the viewport width is less than 768px
- **THEN** the About page content reflows to a single-column layout

