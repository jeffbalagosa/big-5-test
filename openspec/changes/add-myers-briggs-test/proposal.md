# Change: Add Myers-Briggs Type Indicator (MBTI) Personality Test

## Why

Users want the flexibility to choose between personality assessment frameworks. The Myers-Briggs Type Indicator (MBTI) is one of the most widely recognized personality assessments, measuring preferences across four dichotomies (Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, Judging/Perceiving) to produce 16 personality types. Adding MBTI support expands the app's utility and audience.

## What Changes

- Add `--test` CLI parameter to select personality test type (`big5` default, `mbti` for Myers-Briggs)
- Create MBTI questionnaire configuration file (`config/mbti.yaml`) with questions for all four dichotomies
- Extend data models to support MBTI dichotomy scoring (percentage-based preference indicators)
- Add MBTI-specific scoring logic that calculates preference percentages and determines type code
- Update CLI to display MBTI results (4-letter type code + preference strengths)
- Update PDF report generation to support MBTI result visualization
- Refactor questionnaire loading to support multiple test types

## Impact

- Affected specs: personality-tests (new capability)
- Affected code:
  - `main.py` - CLI argument parsing, test selection logic
  - `modules/cli.py` - Display logic for MBTI results
  - `modules/models.py` - New MBTI-specific data models
  - `modules/data_loader.py` - Multi-test questionnaire loading
  - `modules/scoring.py` - MBTI scoring algorithm
  - `modules/plotting.py` - MBTI-specific visualization
  - `modules/pdf_report.py` - MBTI report layout
  - `config/mbti.yaml` - New questionnaire file
