# Change: Add Child-Friendly MBTI Test

## Why

The current MBTI questionnaire uses language and concepts designed for adults. Items reference abstract psychological concepts like "symbols, metaphors, or underlying themes," workplace decision-making scenarios, and vocabulary that may confuse younger test-takers. A child-friendly version with age-appropriate language will enable accurate personality type assessment for 12-year-olds, complementing the existing child-friendly Big-5 questionnaire.

Currently, when a user runs `--test mbti --child`, the system displays "Coming Soon" and exits. This change fulfills that placeholder.

## What Changes

- Add new configuration file `config/mbti-child.yaml` with all 40 MBTI items rewritten for 12-year-olds
- Modify `data_loader.py` to support child MBTI questionnaire loading
- Update CLI to administer child-friendly MBTI instead of showing "Coming Soon"
- Add corresponding JSON file for React frontend (`src/data/mbti-child.json`)
- Update React frontend to support child-friendly MBTI test selection

## Impact

- Affected specs: `personality-tests`
- Affected code:
  - `config/mbti.yaml` → new `config/mbti-child.yaml`
  - `modules/data_loader.py`
  - `main.py`
  - `scripts/convert_yaml_to_json.py`
  - `src/data/mbti-child.json` (new)
  - `src/pages/TestSelectionPage.tsx`
  - `src/hooks/useQuestionnaire.tsx`
