# Tasks: Add Playwright E2E Testing

## 1. Setup

- [x] 1.1 Install Playwright and dependencies (`@playwright/test`)
- [x] 1.2 Run `npx playwright install` to download browser binaries
- [x] 1.3 Create `playwright.config.ts` with project configuration

## 2. Test Infrastructure

- [x] 2.1 Create `e2e/` directory for E2E test files
- [x] 2.2 Add npm scripts: `test:e2e`, `test:e2e:ui`, `test:e2e:headed`
- [x] 2.3 Configure Playwright to start dev server before tests

## 3. Core E2E Tests

- [x] 3.1 Create navigation test (`e2e/navigation.spec.ts`)
  - Home page loads
  - Sidebar navigation works
  - All pages accessible
- [x] 3.2 Create Big-5 questionnaire flow test (`e2e/big5-flow.spec.ts`)
  - Select Big-5 test
  - Complete all questions
  - Verify results display
- [x] 3.3 Create MBTI questionnaire flow test (`e2e/mbti-flow.spec.ts`)
  - Select MBTI test
  - Complete all questions
  - Verify results with MBTI type indicator

## 4. Integration

- [x] 4.1 Update `scripts/pre-certify.ps1` to run E2E tests
- [x] 4.2 Document E2E testing in README or separate E2E docs

## 5. Validation

- [x] 5.1 Run full E2E test suite locally
- [x] 5.2 Verify pre-certify script includes E2E tests
- [x] 5.3 Run `openspec validate add-playwright-e2e-testing --strict`
