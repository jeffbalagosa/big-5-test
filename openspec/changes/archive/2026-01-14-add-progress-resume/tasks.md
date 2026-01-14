## 1. Implementation

- [x] 1.1 Define the persistence contract (storage key, shape, and validation rules) for questionnaire progress.
- [x] 1.2 Implement save/restore of questionnaire progress in `useQuestionnaire` based on the defined contract.
- [x] 1.3 Remove persisted progress on questionnaire completion and on test reset.
- [x] 1.4 Add a Home page "Resume last test" banner that appears only when saved progress exists and routes to `/questionnaire`.
- [x] 1.5 Add unit tests for persistence save/restore, clearing behavior, and resume banner visibility.

## 2. Validation

- [x] 2.1 Run `npm test` (or targeted Vitest runs) to cover the new persistence and resume tests.
