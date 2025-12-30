# Tasks: Add Child-Friendly MBTI Test

## 1. Configuration

- [ ] Create `config/mbti-child.yaml` with all 40 MBTI items rewritten for 12-year-olds
- [ ] Ensure trait mappings (EI, SN, TF, JP) and reverse-scoring flags match the adult version
- [ ] Run `python scripts/convert_yaml_to_json.py` to generate `src/data/mbti-child.json`

## 2. Data Loader Updates (Python Backend)

- [ ] Update `load_questionnaire()` in `data_loader.py` to load child MBTI when both `--test mbti` and `--child` are specified
- [ ] Remove the "Coming Soon" early exit for `--test mbti --child` in `main.py`

## 3. React Frontend Integration

- [ ] Update `TestSelectionPage.tsx` to show child-friendly MBTI option
- [ ] Update `useQuestionnaire.tsx` to load `mbti-child.json` when child MBTI is selected
- [ ] Ensure scoring and results display work correctly with child MBTI data

## 4. Testing

- [ ] Add unit tests for `load_questionnaire()` with MBTI child configuration
- [ ] Add integration test for CLI with `--test mbti --child`
- [ ] Verify child MBTI questionnaire loads correct number of items per dichotomy (10 per dichotomy, 40 total)
- [ ] Add React tests for child MBTI questionnaire loading and scoring

## 5. Documentation

- [ ] Update README with child-friendly MBTI usage

## Dependencies

- Task 2 depends on Task 1 (config file must exist)
- Task 3 depends on Task 1 (JSON file must be generated)
- Task 4 can run in parallel with Task 5 after Tasks 2 and 3

## Validation Criteria

- Running `python main.py --test mbti --child` administers child-friendly MBTI questions
- Running `python main.py --test mbti` (no child flag) uses adult MBTI questionnaire (backward compatible)
- React frontend can select and complete child-friendly MBTI test
- All scoring and PDF generation works identically to adult MBTI
