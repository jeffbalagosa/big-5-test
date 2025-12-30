# development-tooling Specification Delta

## MODIFIED Requirements

### Requirement: Pre-Certification Script

The system SHALL provide a `pre-certify.ps1` PowerShell script that validates code quality for both Python and frontend code before changes are committed or deployed.

#### Scenario: Successful pre-certification

- **WHEN** the pre-certify script is executed
- **AND** all Python tests pass
- **AND** all Python linting checks pass
- **AND** all frontend tests pass
- **AND** all frontend linting checks pass
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

## ADDED Requirements

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

The pre-certify script SHALL verify that Node.js and npm are available before running frontend checks.

#### Scenario: Node.js is available

- **WHEN** the pre-certify script runs
- **AND** `npm` command is available in PATH
- **THEN** frontend tests and linting are executed

#### Scenario: Node.js is not available

- **WHEN** the pre-certify script runs
- **AND** `npm` command is not available in PATH
- **THEN** the script displays an error message
- **AND** the script exits with a non-zero code
