# Development Tooling

## ADDED Requirements

### Requirement: Pre-Certification Script

The system SHALL provide a `pre-certify.ps1` PowerShell script that validates code quality before changes are committed or deployed.

#### Scenario: Successful pre-certification

- **WHEN** the pre-certify script is executed
- **AND** all tests pass
- **AND** all linting checks pass
- **THEN** the script exits with code 0
- **AND** displays a success summary

#### Scenario: Test failure during pre-certification

- **WHEN** the pre-certify script is executed
- **AND** one or more tests fail
- **THEN** the script exits with a non-zero code
- **AND** displays the test failure output

#### Scenario: Linting failure during pre-certification

- **WHEN** the pre-certify script is executed
- **AND** linting detects violations
- **THEN** the script exits with a non-zero code
- **AND** displays the linting violations

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
