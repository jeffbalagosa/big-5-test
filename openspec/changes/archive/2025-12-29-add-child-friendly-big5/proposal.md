# Change: Add Child-Friendly Big-5 Questionnaire for 12 Year Olds

## Why

The current Big-5 questionnaire uses language and concepts designed for adults. Some items reference workplace scenarios, abstract philosophical concepts, or complex vocabulary that may confuse younger test-takers. A child-friendly version with age-appropriate language will enable accurate personality assessment for 12-year-olds.

## What Changes

- Add new configuration file `config/questionnaire-child.yaml` with simplified, age-appropriate language
- Add optional `--child` CLI flag to select the child-friendly questionnaire
- Modify `data_loader.py` to support child questionnaire loading
- Default behavior remains unchanged (adult questionnaire)

## Impact

- Affected specs: `personality-tests`
- Affected code: `modules/data_loader.py`, `main.py`, `config/`
