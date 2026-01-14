# Change: Add in-progress questionnaire resume

## Why
The UI claims progress is saved automatically, but questionnaire state is currently in-memory only. Users lose progress on refresh or close, and there is no resume entry point on the home page.

## What Changes
- Persist in-progress questionnaire session state to localStorage and restore it on load.
- Clear saved in-progress state when a test is completed or reset.
- Show a "Resume last test" banner on Home when in-progress data exists and route directly to the questionnaire.
- Add tests for persistence and resume behavior.

## Impact
- Affected specs: react-frontend
- Affected code: src/hooks/useQuestionnaire.tsx, src/pages/HomePage.tsx, src/hooks/useQuestionnaire.test.tsx, src/pages/HomePage.test.tsx