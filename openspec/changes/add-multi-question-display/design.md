# Design: Add Multi-Question Display

## Overview

This document describes the technical approach for displaying up to 3 questions at once and auto-advancing when the set is complete.

## Architecture

### State Model Changes

The `useQuestionnaire` hook currently tracks:

- `currentQuestionIndex`: Single question pointer
- `answers`: Map of questionId → value
- `isCompleted`: Boolean for test completion

**New/modified state:**

- `currentSetIndex`: Which set of 3 the user is on (0-based)
- Keep `answers` as-is—it already stores all answers by question ID
- Derive "questions answered in current set" from `answers` + `currentSetIndex`

### Set Calculation

```
questionsPerSet = 3
totalQuestions = questions.length
totalSets = Math.ceil(totalQuestions / questionsPerSet)

getQuestionsForSet(setIndex):
  startIdx = setIndex * questionsPerSet
  endIdx = min(startIdx + questionsPerSet, totalQuestions)
  return questions.slice(startIdx, endIdx)
```

For Big-5 (50 questions):

- Sets 0–15: 3 questions each (indices 0–47)
- Set 16: 2 questions (indices 48–49)

For MBTI (60 questions):

- Sets 0–19: 3 questions each (evenly divisible)

### Auto-Advance Logic

When `answerQuestion(questionId, value)` is called:

1. Store answer in `answers` map
2. Get questions for current set
3. Check if all questions in current set now have answers
4. If yes:
   - If this is the last set → set `isCompleted: true`
   - Else → increment `currentSetIndex`

### Component Hierarchy

```
QuestionnairePage
├── ProgressBar (shows set progress)
├── QuestionSet
│   ├── QuestionCard (question 1)
│   ├── QuestionCard (question 2)
│   └── QuestionCard (question 3, if exists)
└── Undo button + Quit button
```

### QuestionCard Answered State

When a question is answered within the current set:

- Show a subtle visual indicator (e.g., green border, checkmark icon, or opacity change)
- The Likert scale selection remains visible and editable until set advances

### Undo Behavior

Current behavior: Undo removes the last answer and decrements `currentQuestionIndex`.

New behavior:

1. Find the last answered question across all questions (by highest question ID with an answer, or track answer order)
2. If that question is in the current set → remove answer, stay on current set
3. If current set has no answers → decrement `currentSetIndex`, remove last answer from previous set

**Simpler approach**: Track answer order with an array `answerOrder: number[]` (question IDs in order answered). Undo pops the last entry and removes that answer.

### Progress Display

Current: "Question X of Y"

New options:

- Keep individual question count in each card: "Question 7 of 50"
- Progress bar shows set progress: filled segments for completed sets
- Optional: "Set 5 of 17" label near progress bar

## Mobile Considerations

Three `QuestionCard` components will stack vertically on mobile. Users may need to scroll to see all 3. This is acceptable because:

- Each card is self-contained and usable
- The pattern is familiar (forms with multiple fields)
- Auto-advance after answering all 3 provides clear feedback
