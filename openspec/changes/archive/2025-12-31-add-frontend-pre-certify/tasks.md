# Tasks: Add Frontend Tests and Linting to Pre-Certify Script

## 1. Implementation

- [x] Add Node.js/npm availability check to pre-certify.ps1
- [x] Add frontend test execution step (`npm run test`)
- [x] Add frontend linting step (`npm run lint`)
- [x] Update overall success/failure logic to include frontend results
- [x] Update script header documentation to mention frontend checks

## 2. Validation

- [x] Run pre-certify.ps1 and verify all four checks execute (pytest, flake8, vitest, eslint)
- [x] Verify script fails if frontend tests fail
- [x] Verify script fails if frontend linting fails
- [x] Verify script passes when all checks pass
