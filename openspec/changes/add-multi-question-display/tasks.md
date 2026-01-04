## 1. Update useQuestionnaire Hook

- [ ] 1.1 Add `getQuestionsForCurrentSet()` method returning up to 3 questions
- [ ] 1.2 Add `getCurrentSetIndex()` and `getTotalSets()` for progress tracking
- [ ] 1.3 Add `answerOrder: number[]` array to track answer sequence for undo
- [ ] 1.4 Modify `answerQuestion()` to auto-advance set when all questions answered
- [ ] 1.5 Set `isCompleted: true` when final question of final set is answered
- [ ] 1.6 Update `undoLastAnswer()` to use answer order and handle set boundaries

## 2. Create QuestionSet Component

- [ ] 2.1 Create `QuestionSet.tsx` that renders multiple `QuestionCard` components vertically
- [ ] 2.2 Pass question data and answer handlers to each card
- [ ] 2.3 Add visual indication of answered vs. unanswered questions in set

## 3. Update QuestionCard Component

- [ ] 3.1 Add visual feedback when a question is answered (e.g., subtle highlight or checkmark)
- [ ] 3.2 Ensure question numbering shows absolute position (e.g., "Question 7 of 50")

## 4. Update QuestionnairePage

- [ ] 4.1 Replace single `QuestionCard` with `QuestionSet` component
- [ ] 4.2 Update progress bar to show set-based progress
- [ ] 4.3 Handle auto-navigation to `/results` when test completes

## 5. Update Tests

- [ ] 5.1 Add tests for `useQuestionnaire` set-based methods
- [ ] 5.2 Add tests for `QuestionSet` component
- [ ] 5.3 Update `QuestionnairePage.test.tsx` for multi-question flow
- [ ] 5.4 Test edge cases: final set with < 3 questions, undo across set boundaries

## 6. Manual Verification

- [ ] 6.1 Test Big-5 (50 questions = 16 sets of 3 + 1 set of 2)
- [ ] 6.2 Test MBTI (60 questions = 20 sets of 3)
- [ ] 6.3 Verify mobile layout with 3 questions
- [ ] 6.4 Verify undo works correctly across set boundaries
- [ ] 6.5 Run `scripts/pre-certify.ps1` to validate code quality
