# Project Context

## Purpose

A modular Python tool for administering and scoring the Big-Five personality test (OCEAN model). It provides an interactive CLI for users to take the survey and generates a professionally formatted PDF report with trait score visualizations.

## Tech Stack

- **Language**: Python 3.6+
- **Data Handling**: `pandas`, `numpy`, `PyYAML`
- **Visualization**: `matplotlib`
- **PDF Generation**: `reportlab`, `pypdf`
- **Testing**: `pytest`
- **CLI**: `argparse`, `colorama`

## Project Conventions

### Code Style

- **Naming**: `snake_case` for functions and variables, `UPPER_CASE` for constants, `PascalCase` for classes.
- **Typing**: Use Python type hints for function signatures and variable declarations.
- **Documentation**: Provide docstrings for modules and functions.
- **Modularity**: Keep logic separated into specialized modules within the `modules/` directory.

### Architecture Patterns

- **Modular Design**: Separation of concerns between data loading, scoring, CLI interaction, plotting, and PDF generation.
- **Configuration-Driven**: Questionnaire items and traits are defined in `config/questionnaire.yaml`.
- **Data Models**: Use `dataclasses` for structured data like questionnaire items.

### Testing Strategy

- **Framework**: `pytest`.
- **Location**: All tests reside in the `tests/` directory.
- **Coverage**: Tests cover data loading, scoring logic (including reverse coding), plotting, and PDF output.

### Git Workflow

- **Branching**: Standard feature branch workflow (though currently primarily using `main`).
- **Commits**: Descriptive commit messages.

## Domain Context

- **Big-Five Model (OCEAN)**: Assesses personality across five dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
- **Likert Scale**: Responses are on a 1-5 scale (Strongly Disagree to Strongly Agree).
- **Scoring**: Trait scores are calculated by summing responses, with specific items being reverse-scored (6 - response).

## Important Constraints

- **Python Version**: Must maintain compatibility with Python 3.6+.
- **No External APIs**: The tool is designed to run locally without external service dependencies for core functionality.

## External Dependencies

- **PyYAML**: For parsing the questionnaire configuration.
- **Matplotlib**: For generating trait score bar graphs.
- **ReportLab**: For PDF layout and generation.
- **PyPDF**: For PDF manipulation if needed.
