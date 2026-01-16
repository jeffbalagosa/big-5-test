# development-tooling Specification

## Purpose

Define requirements for development tools, scripts, and automation used to maintain code quality and streamline the development workflow.
## Requirements
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

### Requirement: Virtual Environment Activation

The pre-certify script SHALL activate the project's `.venv` virtual environment before running tests and linting.

#### Scenario: Virtual environment is activated

- **WHEN** the pre-certify script runs
- **THEN** the `.venv` virtual environment is activated
- **AND** tests and linting use the virtual environment's Python interpreter

### Requirement: Linting Configuration

The pre-certify script SHALL use the project's flake8 configuration (max-line-length=120, ignore=E501).

#### Scenario: Flake8 runs with project settings

- **WHEN** flake8 linting is executed
- **THEN** the `--max-line-length=120` argument is used
- **AND** the `--ignore=E501` argument is used

### Requirement: Frontend Test Execution

The pre-certify script SHALL run frontend tests using `npm run test` (Vitest).

#### Scenario: Frontend tests are executed

- **WHEN** the pre-certify script runs
- **AND** Node.js/npm is available
- **THEN** frontend tests are executed via `npm run test`
- **AND** test results are displayed

### Requirement: Frontend Linting

The pre-certify script SHALL run frontend linting using `npm run lint` (ESLint).

#### Scenario: Frontend linting is executed

- **WHEN** the pre-certify script runs
- **AND** Node.js/npm is available
- **THEN** frontend linting is executed via `npm run lint`
- **AND** linting results are displayed

### Requirement: Node.js Availability Check

The pre-certify script SHALL verify that Node.js and npm are available before running frontend checks and shall ensure Node.js is available for Python CLI tests.

#### Scenario: Node.js is available

- **WHEN** the pre-certify script runs
- **AND** `node` and `npm` commands are available in PATH
- **THEN** frontend tests and linting are executed
- **AND** Python CLI integration tests using Node.js scoring are executed

#### Scenario: Node.js is not available

- **WHEN** the pre-certify script runs
- **AND** `node` or `npm` commands are not available in PATH
- **THEN** the script displays an error message indicating Node.js is required for both frontend and Python CLI functionality
- **AND** the script exits with a non-zero code

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

### Requirement: Python CLI Node.js Dependency

The Python CLI SHALL require Node.js to be installed and available in the system PATH for scoring functionality.

#### Scenario: Python CLI checks for Node.js at startup

- **WHEN** the Python CLI is executed with a test command
- **THEN** the application checks if `node` is available in the system PATH before attempting to score responses

#### Scenario: Node.js not found error message

- **WHEN** the Python CLI attempts to score responses
- **AND** Node.js is not found in the system PATH
- **THEN** the application displays a helpful error message indicating Node.js is required
- **AND** provides installation instructions or a link to Node.js download page

#### Scenario: Node.js version compatibility

- **WHEN** Node.js is detected by the Python CLI
- **THEN** the application works with Node.js v18 or higher

