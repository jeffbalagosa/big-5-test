# Proposal: Add Multi-Question Display

## Summary

Update the questionnaire interface to display up to 3 questions at once instead of one at a time. When the user answers the last question in the current set, the app auto-advances to the next set (or the results page if on the final set).

## Motivation

- **Faster completion**: Users can answer multiple questions without waiting for page transitions between each one.
- **Better pacing**: Grouping questions reduces the feeling of a long, drawn-out questionnaire.
- **Reduced friction**: No explicit "Next" button needed—answering the final question in a set triggers advancement.

## Scope

### In Scope

- Display up to 3 questions simultaneously on the questionnaire page
- Auto-advance to the next set when the last question in the current set is answered
- Auto-navigate to results page when the final question of the entire questionnaire is answered
- Handle final sets with fewer than 3 questions (e.g., Big-5 has 50 questions = 16 sets of 3 + 1 set of 2)
- Update progress tracking to reflect set-based progression
- Maintain undo functionality for multi-question display

### Out of Scope

- Changing the Likert scale options or values
- Modifying the questionnaire data structure
- Backend/CLI changes

## Impact

- **Components affected**: `QuestionnairePage`, `QuestionCard`, `useQuestionnaire` hook
- **New components**: Possibly a `QuestionSet` container component
- **Breaking changes**: None—this is a UX enhancement
- **Test updates**: QuestionnairePage tests will need updates for multi-question behavior

## Risks

- **UX clarity**: Users may not immediately understand the auto-advance behavior. Mitigated by answering naturally filling the set.
- **Mobile layout**: Three questions may require scrolling on mobile. This is acceptable as each question card remains individually usable.

## Alternatives Considered

1. **"Next" button after set completion**: Rejected per user preference for faster flow.
2. **Configurable questions per set**: Over-engineering for current needs; can be added later if needed.
