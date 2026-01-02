# react-frontend Specification Delta

## ADDED Requirements

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
