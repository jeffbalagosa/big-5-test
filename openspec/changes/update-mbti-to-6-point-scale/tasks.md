## 1. Frontend - LikertScale Component

- [ ] 1.1 Update `LikertScale.tsx` to accept an `options` prop with default 5-point options
- [ ] 1.2 Define 6-point MBTI options constant (Strongly Disagree through Strongly Agree, values 1-6)
- [ ] 1.3 Update `QuestionCard.tsx` to pass test type to determine which options to use
- [ ] 1.4 Add unit tests for LikertScale with 6-point options

## 2. Frontend - MBTI Scoring

- [ ] 2.1 Update `scoreMBTI` in `src/utils/scoring.ts` to use scale 1-6 (min=count×1, max=count×6)
- [ ] 2.2 Update reverse scoring to use `7 - response` for MBTI
- [ ] 2.3 Update/add scoring tests in `src/utils/scoring.test.ts` for 6-point MBTI scenarios

## 3. Backend (Python CLI) - MBTI Scoring

- [ ] 3.1 Update `_score_item` in `modules/scoring.py` to accept scale parameter or create MBTI-specific function
- [ ] 3.2 Update `score_mbti_responses` to use 1-6 scale range
- [ ] 3.3 Update MBTI scoring tests in `tests/test_mbti_scoring.py` for 6-point scale

## 4. Integration & Validation

- [ ] 4.1 Run frontend test suite (`npm test`) and fix any failures
- [ ] 4.2 Run backend test suite (`pytest`) and fix any failures
- [ ] 4.3 Manual testing: Complete MBTI test via frontend, verify 6 response options appear
- [ ] 4.4 Manual testing: Complete Big-5 test, verify 5 response options still appear
- [ ] 4.5 Run `scripts/pre-certify.ps1` to validate code quality
