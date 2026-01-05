## 1. Update useQuestionnaire Hook

- [x] 1.1 Add `getQuestionsForCurrentSet()` method returning up to 3 questions
- [x] 1.2 Add `getCurrentSetIndex()` and `getTotalSets()` for progress tracking
- [x] 1.3 Add `answerOrder: number[]` array to track answer sequence for undo
- [x] 1.4 Modify `answerQuestion()` to auto-advance set when all questions answered
- [x] 1.5 Set `isCompleted: true` when final question of final set is answered
- [x] 1.6 Update `undoLastAnswer()` to use answer order and handle set boundaries

## 2. Create QuestionSet Component

- [x] 2.1 Create `QuestionSet.tsx` that renders multiple `QuestionCard` components vertically
- [x] 2.2 Pass question data and answer handlers to each card
- [x] 2.3 Add visual indication of answered vs. unanswered questions in set

## 3. Update QuestionCard Component

- [x] 3.1 Add visual feedback when a question is answered (e.g., subtle highlight or checkmark)
- [x] 3.2 Ensure question numbering shows absolute position (e.g., "Question 7 of 50")

## 4. Update QuestionnairePage

- [x] 4.1 Replace single `QuestionCard` with `QuestionSet` component
- [x] 4.2 Update progress bar to show set-based progress
- [x] 4.3 Handle auto-navigation to `/results` when test completes

## 5. Update Tests

- [x] 5.1 Add tests for `useQuestionnaire` set-based methods
- [x] 5.2 Add tests for `QuestionSet` component
- [x] 5.3 Update `QuestionnairePage.test.tsx` for multi-question flow
- [x] 5.4 Test edge cases: final set with < 3 questions, undo across set boundaries

## 6. Manual Verification

- [x] 6.1 Test Big-5 (50 questions = 16 sets of 3 + 1 set of 2)
- [x] 6.2 Test MBTI (60 questions = 20 sets of 3)
- [x] 6.3 Verify mobile layout with 3 questions
- [x] 6.4 Verify undo works correctly across set boundaries
- [x] 6.5 Run `scripts/pre-certify.ps1` to validate code quality
