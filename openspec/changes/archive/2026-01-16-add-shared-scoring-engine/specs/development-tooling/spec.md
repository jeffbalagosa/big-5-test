# development-tooling Spec Delta

## ADDED Requirements

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

## MODIFIED Requirements

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
