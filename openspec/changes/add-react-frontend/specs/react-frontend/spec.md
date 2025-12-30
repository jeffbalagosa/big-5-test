# react-frontend Specification

## Purpose

Provide a web-based user interface for administering personality questionnaires, displaying results, and generating PDF reports.

## ADDED Requirements

### Requirement: Navigation Drawer Layout

The frontend SHALL provide a left-side navigation drawer for accessing all application sections.

#### Scenario: Navigation drawer display

- **WHEN** the user loads the application
- **THEN** a navigation drawer is visible on the left side with links to: Home, Take Test, and About

#### Scenario: Navigation drawer mobile collapse

- **WHEN** the viewport width is less than 768px
- **THEN** the navigation drawer collapses to a hamburger menu icon

#### Scenario: Navigation drawer expand on mobile

- **WHEN** the user clicks the hamburger menu icon on mobile
- **THEN** the navigation drawer slides in from the left as an overlay

---

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

The frontend SHALL display questions one at a time with a Likert scale response mechanism.

#### Scenario: Display current question

- **WHEN** the user is taking a questionnaire
- **THEN** the current question text is displayed prominently with the question number

#### Scenario: Likert scale response

- **WHEN** a question is displayed
- **THEN** five response buttons are shown labeled: "Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"

#### Scenario: Select response and advance

- **WHEN** the user clicks a Likert scale button
- **THEN** the response is recorded and the next question is displayed

#### Scenario: Show progress indicator

- **WHEN** the user is taking a questionnaire
- **THEN** a progress bar shows the percentage of questions completed

#### Scenario: Undo previous answer

- **WHEN** the user clicks the "Undo" button
- **THEN** the previous question is displayed and its response is removed

#### Scenario: Undo disabled on first question

- **WHEN** the user is on the first question
- **THEN** the "Undo" button is disabled

---

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
