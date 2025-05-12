# Big-Five Personality Questionnaire

This repository contains a modular Python project to administer and score a short Big-Five personality questionnaire. The Big-Five model assesses personality across five dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.

The project provides an interactive command-line interface (CLI) for users to take the survey and receive their raw scores for each trait. Questionnaire items are loaded from an external `questionnaire.yaml` file, making it easy to customize or extend the survey.

## About the Big-Five Model

The Big-Five personality model is a widely accepted framework in psychology that describes human personality along five dimensions:

- **Openness**: Appreciation for art, emotion, adventure, and unusual ideas.
- **Conscientiousness**: Tendency to be organized, dependable, and disciplined.
- **Extraversion**: Energy, positive emotions, and the tendency to seek stimulation in the company of others.
- **Agreeableness**: Tendency to be compassionate and cooperative towards others.
- **Neuroticism**: Tendency to experience unpleasant emotions easily, such as anger, anxiety, or depression.

This questionnaire provides a brief assessment of these traits based on your responses.

## Installation

To use this project, ensure you have Python 3.6 or later installed on your system. No additional dependencies are required for running the main script. If you plan to run tests or use additional tools, install dependencies from `requirements.txt`:

```bash
pip install -r requirements.txt
```

The repository can be cloned or downloaded as needed.

## Usage

To take the Big-Five personality survey, run the following command:

```bash
python big_5.py
```

You will be presented with a series of statements. For each statement, respond with a number from 1 to 5, where:

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

After completing the questionnaire, you can generate a professionally formatted PDF report with a bar graph of your Big Five trait scores.

### Usage

Run the CLI with the `--pdf` option:

```
python big_5.py --pdf big5_report.pdf --author "Your Name"
```

- `--pdf <path>`: Path to save the PDF report.
- `--author <name>`: (Optional) Author name to include in the PDF.

The PDF will include:
- A bar graph of your Big Five scores
- Title, date, and optional author
- Professional layout suitable for business or academic use

### Requirements
- Python 3.8+
- See `requirements.txt` for dependencies (matplotlib, pandas, reportlab, etc.)

### Example Output

![Sample Bar Graph](docs/sample_bar_graph.png)

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
