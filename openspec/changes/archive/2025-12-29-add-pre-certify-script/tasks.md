# Tasks: Add pre-certify.ps1 script

## 1. Implementation

- [x] 1.1 Add `flake8` to `requirements.txt`
- [x] 1.2 Create `scripts/pre-certify.ps1` with virtual environment activation
- [x] 1.3 Add pytest test execution with pass/fail reporting
- [x] 1.4 Add flake8 linting with project-configured rules (--max-line-length=120 --ignore=E501)
- [x] 1.5 Add overall status summary and exit code handling

## 2. Validation

- [x] 2.1 Test script execution manually
- [x] 2.2 Verify script fails correctly when tests fail
- [x] 2.3 Verify script fails correctly when linting fails
