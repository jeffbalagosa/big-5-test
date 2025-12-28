# Tasks: Add Child-Friendly Big-5 Questionnaire

## 1. Configuration

- [ ] Create `config/questionnaire-child.yaml` with all 50 Big-5 items rewritten for 12-year-olds
- [ ] Ensure trait mappings and reverse-scoring flags match the adult version

## 2. Data Loader Updates

- [ ] Add `child` boolean parameter to `load_questionnaire()` function
- [ ] Implement file selection logic based on `child` flag

## 3. CLI Integration

- [ ] Add `--child` flag to `argparse` in `main.py`
- [ ] Pass `child` flag to `load_questionnaire()` call
- [ ] Add early exit with "Coming Soon" message when `--test mbti --child` is used

## 4. Testing

- [ ] Add unit tests for `load_questionnaire()` with `child` parameter
- [ ] Add integration test for CLI with `--child` flag
- [ ] Verify child questionnaire loads correct number of items per trait

## 5. Documentation

- [ ] Update README with `--child` flag usage

## Dependencies

- Task 2 depends on Task 1 (config file must exist)
- Task 3 depends on Task 2 (loader must support child flag)
- Task 4 can run in parallel with Task 5 after Task 3

## Validation Criteria

- Running `python main.py --child` administers child-friendly questions
- Running `python main.py` (no flag) uses adult questionnaire (backward compatible)
- Running `python main.py --test mbti --child` displays "Coming Soon" and exits
