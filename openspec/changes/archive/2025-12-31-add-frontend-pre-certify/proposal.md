# Change: Add Frontend Tests and Linting to Pre-Certify Script

## Why

The pre-certify script currently only validates Python code (pytest + flake8), but the project now has a React TypeScript frontend with its own test suite (Vitest) and linting (ESLint). Frontend code quality is not validated before commits, creating a gap in the pre-certification process.

## What Changes

- Add frontend test execution (`npm run test`) to pre-certify.ps1
- Add frontend linting (`npm run lint`) to pre-certify.ps1
- Verify Node.js/npm availability before running frontend checks
- Update success/failure reporting to include frontend results

## Impact

- Affected specs: `development-tooling`
- Affected code: `scripts/pre-certify.ps1`
