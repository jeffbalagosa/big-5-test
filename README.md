# Personality Questionnaire

This repository contains a modular Python project to administer and score personality questionnaires. It currently supports the **Big-Five (OCEAN)** model and the **Myers-Briggs Type Indicator (MBTI)**.

## Supported Tests

### Big-Five Model

The Big-Five model assesses personality across five dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.

### Myers-Briggs Type Indicator (MBTI)

The MBTI assesses personality across four dichotomies:

- **Extraversion (E) vs Introversion (I)**
- **Sensing (S) vs Intuition (N)**
- **Thinking (T) vs Feeling (F)**
- **Judging (J) vs Perceiving (P)**

## Installation

To use this project, ensure you have Python 3.6 or later installed on your system. No additional dependencies are required for running the main script. If you plan to run tests or use additional tools, install dependencies from `requirements.txt`:

```bash
pip install -r requirements.txt
```

The repository can be cloned or downloaded as needed.

### Clean install (Windows PowerShell)

A convenience script is included to create a fresh virtual environment and install the exact pinned dependencies from `requirements.txt`.

Run from the repo root:

```powershell
# Remove old .venv, create new one, upgrade pip tooling, install requirements
./scripts/clean-install.ps1

# Optional: purge pip cache and ignore cache during install
./scripts/clean-install.ps1 -NoCache

# Optional: run tests after install
./scripts/clean-install.ps1 -RunTests
```

Notes:

- If script execution is blocked, allow it for the current session only:
  ```powershell
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  ```
- Activate the environment after running the script:
  ```powershell
  .\.venv\Scripts\Activate.ps1
  ```

## Usage

To take a personality survey, run the following command:

```bash
python main.py
```

By default, this runs the Big-Five test. To select a specific test, use the `--test` parameter:

```bash
# Run Big-Five (default)
python main.py --test big5

# Run Myers-Briggs (MBTI)
python main.py --test mbti
```

### Child-Friendly Version

For younger test-takers (around 12 years old), a child-friendly version of the Big-Five questionnaire is available with simplified language.

```bash
python main.py --child
```

- 1 = Strongly Disagree
- 2 = Disagree
- 3 = Neutral
- 4 = Agree
- 5 = Strongly Agree

At the start, the Likert scale and its labels will be displayed for reference.

**Special commands during the survey:**

- Type `z` to undo your last answer.
- Type `done` (after answering all questions) to finish and see your results.

After answering all the questions, your raw scores for each of the five personality traits will be displayed.

> **Note:** To customize the questionnaire, edit the `config/questionnaire.yaml` file.

## PDF Report Generation

After completing the questionnaire, you can generate a professionally formatted PDF report with a bar graph of your results.

### Usage

Run the CLI with the `--pdf` option:

```bash
# Big Five report
python main.py --test big5 --pdf big5_report.pdf --author "Your Name"

# MBTI report
python main.py --test mbti --pdf mbti_report.pdf --author "Your Name"
```

- `--pdf <path>`: Path to save the PDF report.
- `--author <name>`: (Optional) Author name to include in the PDF.
- `--test <type>`: (Optional) `big5` or `mbti`.

The PDF will include:

- A bar graph of your Big Five scores
- Title, date, and optional author
- Professional layout suitable for business or academic use

### Requirements

- Python 3.8+
- See `requirements.txt` for dependencies (matplotlib, pandas, reportlab, etc.)

### Example Output

![Sample Bar Graph](docs/sample_bar_graph.png)

### Sample Report Generation Scripts

For demonstration purposes, you can generate sample PDF reports without taking the full survey (ensure your virtual environment is activated):

```powershell
# Generate a sample Big Five report
python scripts/generate_big5_report.py

# Generate a sample MBTI report (INTJ profile)
python scripts/generate_intj_report.py
```

These scripts will create `big5_sample_report.pdf` and `intj_sample_report.pdf` in the project root.

---

For more details, see the `tempDevDocs/pdf_output_feature.md` file.

## Testing

The repository includes unit tests to ensure the scoring logic and CLI behavior are correct. To run the tests, you need to have `pytest` installed. You can install it using:

```bash
pip install pytest
```

Then, run the tests with:

```bash
python -m pytest
```

This will execute the tests in the `tests` directory. After modularization, tests import `collect_answers` from `modules/cli.py` and `_score_item` from `scoring.py`.

## Project Structure

The codebase is organized into the following modules:

- `big_5.py`: Entry point that wires together all modules and runs the CLI survey.
- `modules/cli.py`: Contains CLI logic, including `collect_answers` (handles user input/undo) and `administer` (runs the CLI survey).
- `modules/models.py`: Defines the `Item` dataclass and `LIKERT_LABELS` dictionary.
- `modules/data_loader.py`: Loads questions from the YAML file.
- `scoring.py`: Contains scoring logic, including `_score_item` (for individual item scoring) and `score_responses` (for full questionnaire scoring).
- `config/questionnaire.yaml`: YAML file with questionnaire items (customizable).
- `tests/test_big_5.py`: Unit tests for CLI and scoring functions.
- `requirements.txt`: Lists Python dependencies for development and testing.
- `.gitignore`: Specifies files and directories to be ignored by Git.

## Extending or Customizing

To extend or modify the project, follow the modular pattern: keep each module focused on a single responsibility. For new features, create new modules as needed and update `big_5.py` to integrate them.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Disclaimer

This questionnaire is a simplified version of the Big-Five personality assessment and is intended for educational or entertainment purposes only. It should not be used for clinical diagnosis or professional psychological evaluation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
