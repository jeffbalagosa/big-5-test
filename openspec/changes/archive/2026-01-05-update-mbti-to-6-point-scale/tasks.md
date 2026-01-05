## 1. Frontend - LikertScale Component

- [x] 1.1 Update `LikertScale.tsx` to accept an `options` prop with default 5-point options
- [x] 1.2 Define 6-point MBTI options constant (Strongly Disagree through Strongly Agree, values 1-6)
- [x] 1.3 Update `QuestionCard.tsx` to pass test type to determine which options to use
- [x] 1.4 Add unit tests for LikertScale with 6-point options

## 2. Frontend - MBTI Scoring

- [x] 2.1 Update `scoreMBTI` in `src/utils/scoring.ts` to use scale 1-6 (min=count×1, max=count×6)
- [x] 2.2 Update reverse scoring to use `7 - response` for MBTI
- [x] 2.3 Update/add scoring tests in `src/utils/scoring.test.ts` for 6-point MBTI scenarios

## 3. Backend (Python CLI) - MBTI Scoring

- [x] 3.1 Update `_score_item` in `modules/scoring.py` to accept scale parameter or create MBTI-specific function
- [x] 3.2 Update `score_mbti_responses` to use 1-6 scale range
- [x] 3.3 Update MBTI scoring tests in `tests/test_mbti_scoring.py` for 6-point scale

## 4. Integration & Validation

- [x] 4.1 Run frontend test suite (`npm test`) and fix any failures
- [x] 4.2 Run backend test suite (`pytest`) and fix any failures
- [x] 4.3 Manual testing: Complete MBTI test via frontend, verify 6 response options appear
- [x] 4.4 Manual testing: Complete Big-5 test, verify 5 response options still appear
- [x] 4.5 Run `scripts/pre-certify.ps1` to validate code quality
- [x] 4.6 Add `tsc` type checking to `pre-certify.ps1` to prevent `verbatimModuleSyntax` regressions
