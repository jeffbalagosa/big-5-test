# Tasks: Add pre-certify.ps1 script

## 1. Implementation

- [ ] 1.1 Add `flake8` to `requirements.txt`
- [ ] 1.2 Create `scripts/pre-certify.ps1` with virtual environment activation
- [ ] 1.3 Add pytest test execution with pass/fail reporting
- [ ] 1.4 Add flake8 linting with project-configured rules (--max-line-length=120 --ignore=E501)
- [ ] 1.5 Add overall status summary and exit code handling

## 2. Validation

- [ ] 2.1 Test script execution manually
- [ ] 2.2 Verify script fails correctly when tests fail
- [ ] 2.3 Verify script fails correctly when linting fails
