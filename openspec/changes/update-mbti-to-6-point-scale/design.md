## Context

The application currently uses a single 5-point Likert scale for both Big-5 and MBTI questionnaires. This shared scale includes a "Neutral" option (value 3), which can lead to tie scores in MBTI dichotomies when respondents frequently choose neutral responses.

### Stakeholders

- End users taking personality tests
- Frontend (React) and backend (Python CLI) codebases

## Goals / Non-Goals

**Goals:**

- Eliminate tie scores in MBTI by forcing respondents to lean toward one pole
- Preserve the existing Big-5 behavior unchanged
- Maintain consistent UX patterns between test types where possible

**Non-Goals:**

- Changing the Big-5 questionnaire scale
- Modifying questionnaire item text or structure
- Changing the MBTI type determination logic beyond scale adjustment

## Decisions

### Decision 1: Separate Scale Components by Test Type

**What:** Create a mechanism to render different Likert scales based on the test type. For MBTI, use 6 options; for Big-5, keep 5 options.

**Why:** This is the minimal change that preserves Big-5 behavior while enabling the MBTI-specific requirement.

**Alternatives considered:**

1. **Single component with props** - Pass options array to `LikertScale` component. Simple but requires changes to all calling code.
2. **Separate components** - Create `LikertScale6` and `LikertScale5`. More explicit but duplicates styling logic.
3. **Test-type-aware component** - Pass `testType` prop to existing component. Couples UI to domain logic.

**Chosen approach:** Option 1 - Pass configurable options to `LikertScale`. The `QuestionCard` will receive the test type and select appropriate options.

### Decision 2: Scoring Scale Adjustment

**What:** Update scoring calculations to use appropriate scale ranges:

- Big-5: min=1, max=5 (unchanged)
- MBTI: min=1, max=6

**Why:** The percentage calculation `(score - min) / (max - min) * 100` must reflect the actual response range.

**Reverse scoring:** For MBTI, reverse scoring becomes `7 - response` (instead of `6 - response`).

### Decision 3: Python CLI Scale Handling

**What:** Introduce a scale parameter to `_score_item()` or create a separate MBTI scoring path.

**Why:** The CLI must match frontend behavior for consistent results.

## Risks / Trade-offs

| Risk                                                          | Mitigation                                                        |
| ------------------------------------------------------------- | ----------------------------------------------------------------- |
| Existing MBTI test results become incomparable to new results | Document scale change; this is a one-time migration               |
| User confusion about different scale lengths                  | Clear labeling; scales appear similar (disagree ↔ agree spectrum) |
| Code duplication                                              | Keep shared styling, only options differ                          |

## Open Questions

- None currently; the approach is straightforward.
