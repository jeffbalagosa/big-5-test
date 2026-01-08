# Delta: development-tooling

## ADDED Requirements

### Requirement: Playwright E2E Testing

The system SHALL provide Playwright-based end-to-end tests that verify complete user flows across the frontend application.

#### Scenario: E2E tests can be executed

- **WHEN** the developer runs `npm run test:e2e`
- **THEN** Playwright executes all E2E tests in the `e2e/` directory
- **AND** a dev server is started automatically if not running
- **AND** test results are displayed in the terminal

#### Scenario: E2E tests run in headed mode

- **WHEN** the developer runs `npm run test:e2e:headed`
- **THEN** Playwright runs tests with visible browser windows
- **AND** the developer can observe the test execution

#### Scenario: E2E tests run in UI mode

- **WHEN** the developer runs `npm run test:e2e:ui`
- **THEN** Playwright opens the interactive UI mode
- **AND** the developer can select and debug individual tests

### Requirement: E2E Navigation Tests

The system SHALL include E2E tests that verify navigation and page accessibility.

#### Scenario: Home page loads successfully

- **WHEN** the E2E test navigates to the root URL
- **THEN** the home page content is visible
- **AND** the sidebar navigation is present

#### Scenario: All main pages are accessible

- **WHEN** the E2E test navigates through sidebar links
- **THEN** each page (Home, Tests, About) loads successfully
- **AND** page-specific content is displayed

### Requirement: E2E Questionnaire Flow Tests

The system SHALL include E2E tests that verify complete questionnaire flows from selection to results.

#### Scenario: Big-5 test flow completion

- **WHEN** the E2E test selects the Big-5 test type
- **AND** completes all questionnaire questions
- **THEN** the results page displays trait scores
- **AND** a bar chart visualization is present

#### Scenario: MBTI test flow completion

- **WHEN** the E2E test selects the MBTI test type
- **AND** completes all questionnaire questions
- **THEN** the results page displays the 4-letter type code
- **AND** dichotomy breakdown is visible

## MODIFIED Requirements

### Requirement: Pre-Certification Script

The system SHALL provide a `pre-certify.ps1` PowerShell script that validates code quality for both Python and frontend code before changes are committed or deployed.

#### Scenario: Successful pre-certification

- **WHEN** the pre-certify script is executed
- **AND** all Python tests pass
- **AND** all Python linting checks pass
- **AND** all frontend tests pass
- **AND** all frontend linting checks pass
- **AND** all E2E tests pass
- **THEN** the script exits with code 0
- **AND** displays a success summary

#### Scenario: Frontend test failure during pre-certification

- **WHEN** the pre-certify script is executed
- **AND** one or more frontend tests fail
- **THEN** the script exits with a non-zero code
- **AND** displays the frontend test failure output

#### Scenario: Frontend linting failure during pre-certification

- **WHEN** the pre-certify script is executed
- **AND** frontend linting detects violations
- **THEN** the script exits with a non-zero code
- **AND** displays the frontend linting violations

#### Scenario: E2E test failure during pre-certification

- **WHEN** the pre-certify script is executed
- **AND** one or more E2E tests fail
- **THEN** the script exits with a non-zero code
- **AND** displays the E2E test failure output
