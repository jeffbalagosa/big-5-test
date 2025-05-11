# Big-Five Personality Questionnaire

This repository contains a Python script to administer and score a short Big-Five personality questionnaire. The Big-Five model assesses personality across five dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.

The script provides an interactive command-line interface (CLI) for users to take the survey and receive their raw scores for each trait.

## About the Big-Five Model

The Big-Five personality model is a widely accepted framework in psychology that describes human personality along five dimensions:

- **Openness**: Appreciation for art, emotion, adventure, and unusual ideas.
- **Conscientiousness**: Tendency to be organized, dependable, and disciplined.
- **Extraversion**: Energy, positive emotions, and the tendency to seek stimulation in the company of others.
- **Agreeableness**: Tendency to be compassionate and cooperative towards others.
- **Neuroticism**: Tendency to experience unpleasant emotions easily, such as anger, anxiety, or depression.

This questionnaire provides a brief assessment of these traits based on your responses.

## Installation

To use this script, ensure you have Python 3.6 or later installed on your system. No additional dependencies are required.

The repository can be cloned or downloaded as needed.

## Usage

To take the Big-Five personality survey, run the following command:

```bash
python big_5.py
```

This will start an interactive CLI where you will be presented with a series of statements. For each statement, respond with a number from 1 to 5, where:

- 1 = Strongly Disagree
- 2 = Disagree
- 3 = Neutral
- 4 = Agree
- 5 = Strongly Agree

After answering all the questions, your raw scores for each of the five personality traits will be displayed.

## Testing

The repository includes unit tests to ensure the scoring logic is correct. To run the tests, you need to have `pytest` installed. You can install it using:

```bash
pip install pytest
```

Then, run the tests with:

```bash
python -m pytest
```

This will execute the tests in the `tests` directory.

## Project Structure

- `big_5.py`: The main script containing the questionnaire and scoring logic.
- `tests/test_big_5.py`: Unit tests for the scoring functions.
- `.gitignore`: Specifies files and directories to be ignored by Git.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Disclaimer

This questionnaire is a simplified version of the Big-Five personality assessment and is intended for educational or entertainment purposes only. It should not be used for clinical diagnosis or professional psychological evaluation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.