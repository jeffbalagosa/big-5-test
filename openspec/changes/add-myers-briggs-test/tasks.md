# Tasks: Add Myers-Briggs Type Indicator (MBTI) Personality Test

## 1. Data Models and Configuration

- [x] 1.1 Update `modules/models.py` to add MBTI-specific constants (dichotomy labels, pole mappings)
- [x] 1.2 Create `config/mbti.yaml` with MBTI questionnaire items (10 questions per dichotomy, 40 total)
- [x] 1.3 Update `modules/data_loader.py` to support loading different questionnaire files by test type

## 2. Scoring Logic

- [x] 2.1 Add MBTI scoring function in `modules/scoring.py` that calculates preference percentages per dichotomy
- [x] 2.2 Add function to determine 4-letter MBTI type code from dichotomy scores
- [x] 2.3 Write unit tests for MBTI scoring logic (normal cases, edge cases, reverse-scored items)

## 3. CLI Integration

- [x] 3.1 Add `--test` argument to `main.py` argparse with choices `big5` (default) and `mbti`
- [x] 3.2 Update `main.py` to load appropriate questionnaire based on `--test` value
- [x] 3.3 Update `modules/cli.py` to display MBTI-specific results (type code + preference percentages)
- [x] 3.4 Update welcome message and instructions to be test-type-aware

## 4. Visualization

- [x] 4.1 Add MBTI-specific bar graph function in `modules/plotting.py` (dichotomy bars with both poles)
- [x] 4.2 Write unit tests for MBTI plotting

## 5. PDF Report

- [x] 5.1 Update `modules/pdf_report.py` to support MBTI report layout
- [x] 5.2 Update `main.py` `export_pdf_report` function to handle MBTI results
- [x] 5.3 Write unit tests for MBTI PDF generation

## 6. Integration Testing

- [x] 6.1 Add integration test for full MBTI flow (CLI → scoring → PDF)
- [x] 6.2 Verify Big Five behavior unchanged (regression test)
- [x] 6.3 Update README.md with MBTI usage instructions

## Dependencies

- Tasks 1.x must complete before 2.x and 3.x
- Tasks 2.x and 3.x can proceed in parallel after 1.x
- Tasks 4.x and 5.x depend on 2.x completion
- Task 6.x depends on all previous tasks
