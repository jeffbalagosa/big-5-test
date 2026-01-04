# Change: Update MBTI to 6-Point Likert Scale

## Why

The current 5-point Likert scale (Strongly Disagree to Strongly Agree with Neutral) allows for tie scores in MBTI dichotomies when respondents frequently choose the neutral option. By removing the neutral midpoint and using a 6-point scale, respondents must lean toward one pole, eliminating ties and producing clearer preference indicators.

## What Changes

- **MBTI Frontend**: Introduce a 6-point Likert scale component for MBTI tests only (Strongly Disagree, Disagree, Slightly Disagree, Slightly Agree, Agree, Strongly Agree)
- **MBTI Scoring (Frontend)**: Update `scoreMBTI` function to use 6-point scale math (min=1, max=6 per item)
- **MBTI Scoring (CLI/Python)**: Update `score_mbti_responses` function to use 6-point scale math
- **MBTI Spec Update**: Modify MBTI item format requirement to specify 6-point scale instead of 5-point

## What Does NOT Change

- **Big-5 Test**: Remains on the existing 5-point scale (Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree)
- **Big-5 Scoring**: No changes to Big-5 scoring logic
- **Questionnaire Data**: YAML/JSON item definitions remain unchanged (only response options change)

## Impact

- **Affected specs**: `personality-tests`
- **Affected code**:
  - `src/components/Questionnaire/LikertScale.tsx` (add MBTI-specific scale or prop)
  - `src/utils/scoring.ts` (`scoreMBTI` function)
  - `src/pages/QuestionnairePage.tsx` (pass test type to scale component)
  - `modules/scoring.py` (`score_mbti_responses`, `_score_item`)
  - Associated tests for both frontend and backend scoring
