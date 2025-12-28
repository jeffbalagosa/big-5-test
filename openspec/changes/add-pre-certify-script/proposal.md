# Change: Add pre-certify.ps1 script

## Why

Developers need a single command to activate the Python virtual environment, run all tests, and execute linting checks before committing or certifying changes. This ensures code quality without requiring multiple manual steps.

## What Changes

- Add `flake8` to `requirements.txt` (not currently included)
- Add `scripts/pre-certify.ps1` that:
  - Activates the `.venv` virtual environment
  - Runs all tests via pytest
  - Runs flake8 linting with project-configured rules
  - Reports overall pass/fail status

## Impact

- Affected specs: development-tooling (new capability)
- Affected code: `scripts/` directory
