# Tasks: Fix Likert Scale Responsive Layout

## Implementation Tasks

- [ ] **Create useMediaQuery hook** – Add a reusable hook `src/hooks/useMediaQuery.ts` that detects viewport width changes and returns a boolean for mobile vs. desktop.

- [ ] **Update LikertScale component** – Modify `src/components/Questionnaire/LikertScale.tsx` to:

  - Import and use the `useMediaQuery` hook
  - Apply `flex-direction: row` with `flex-wrap: nowrap` for desktop (≥768px)
  - Apply `flex-direction: column` with full-width buttons for mobile (<768px)
  - Ensure buttons don't overflow or get cut off on desktop

- [ ] **Add unit tests for useMediaQuery** – Create `src/hooks/useMediaQuery.test.ts` to verify the hook correctly responds to viewport changes.

- [ ] **Verify visual behavior** – Manually test the questionnaire page at various viewport widths to confirm:

  - Desktop: Single horizontal row, no wrapping
  - Mobile: Single vertical column, full-width buttons

- [ ] **Run pre-certify script** – Execute `scripts/pre-certify.ps1` to validate linting and tests pass.
