# Project Context

## Purpose

A comprehensive personality assessment tool supporting Big Five (OCEAN) and Myers-Briggs (MBTI) tests. It provides both a modern React web interface and a Python CLI for administering questionnaires and generating professionally formatted PDF reports with trait score visualizations.

## Tech Stack

### Frontend (Web Interface)

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router DOM
- **PDF Generation**: jsPDF with autotable plugin
- **Icons**: Lucide React
- **Testing**: Vitest with React Testing Library
- **Linting**: ESLint with TypeScript support

### Backend (CLI & Core)

- **Language**: Python 3.10+
- **Data Handling**: `pandas`, `numpy`, `PyYAML`
- **Visualization**: `matplotlib`
- **PDF Generation**: `reportlab`, `pypdf`
- **Testing**: `pytest`
- **CLI**: `argparse`, `colorama`

## Project Conventions

### Code Style

#### TypeScript/React

- **Naming**: `camelCase` for functions and variables, `PascalCase` for components and types.
- **Components**: Functional components with hooks.
- **Typing**: Strict TypeScript with explicit type annotations.

#### Python

- **Naming**: `snake_case` for functions and variables, `UPPER_CASE` for constants, `PascalCase` for classes.
- **Typing**: Use Python type hints for function signatures and variable declarations.
- **Documentation**: Provide docstrings for modules and functions.
- **Modularity**: Keep logic separated into specialized modules within the `modules/` directory.

### Architecture Patterns

- **Dual Interface**: Web frontend (React) and CLI (Python) share questionnaire data via JSON/YAML.
- **Configuration-Driven**: Questionnaire items are defined in `config/*.yaml` and converted to `src/data/*.json` for the frontend.
- **Component-Based UI**: React components organized by feature (Layout, Questionnaire, Results).
- **Modular Backend**: Separation of concerns between data loading, scoring, CLI interaction, plotting, and PDF generation.

### Testing Strategy

- **Frontend**: Vitest with React Testing Library in `src/` (co-located `*.test.tsx` files).
- **Backend**: pytest with tests in the `tests/` directory.
- **Pre-certification**: `scripts/pre-certify.ps1` validates code quality before commits.

### Git Workflow

- **Branching**: Feature branch workflow with `main` as the default branch.
- **Commits**: Descriptive commit messages.

## Domain Context

- **Big Five Model (OCEAN)**: Assesses personality across five dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
- **Myers-Briggs (MBTI)**: Assesses four dichotomies: Extraversion/Introversion (E/I), Sensing/Intuition (S/N), Thinking/Feeling (T/F), and Judging/Perceiving (J/P).
- **Likert Scale**: Responses are on a 1-5 scale (Strongly Disagree to Strongly Agree).
- **Scoring**: Trait scores are calculated by summing responses, with specific items being reverse-scored (6 - response).
- **Child-Friendly Mode**: Simplified language variant for younger audiences (Big Five only).

## Important Constraints

- **Node.js Version**: v18+ for frontend development.
- **Python Version**: Must maintain compatibility with Python 3.10+.
- **No External APIs**: The tool is designed to run locally without external service dependencies for core functionality.
- **Data Sync**: When modifying `config/*.yaml`, run `python scripts/convert_yaml_to_json.py` to regenerate frontend JSON files.

## External Dependencies

### Frontend

- **React**: UI framework.
- **jsPDF**: Client-side PDF generation.
- **React Router**: Client-side routing.

### Backend

- **PyYAML**: For parsing the questionnaire configuration.
- **Matplotlib**: For generating trait score bar graphs.
- **ReportLab**: For PDF layout and generation.
- **PyPDF**: For PDF manipulation if needed.
