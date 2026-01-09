# Change: Add Playwright E2E Testing

## Why

The project currently has unit tests (Vitest for frontend, pytest for backend) but lacks end-to-end (E2E) testing. E2E tests are critical for verifying that the complete user flow—from test selection through questionnaire completion to results display and PDF export—works correctly across browsers. Playwright provides a modern, reliable, and fast framework for cross-browser E2E testing.

## What Changes

- Install Playwright as a dev dependency with browser binaries
- Add Playwright configuration file (`playwright.config.ts`)
- Create initial E2E test suite covering core user flows
- Add npm scripts for running E2E tests
- Update pre-certification script to include E2E test execution
- Add GitHub Actions workflow for E2E tests (optional enhancement)

## Impact

- Affected specs: `development-tooling`
- Affected code:
  - `package.json` (new dependencies and scripts)
  - `scripts/pre-certify.ps1` (new E2E test step)
  - New files: `playwright.config.ts`, `e2e/` directory with test files
