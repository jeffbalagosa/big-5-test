# Personality Test Tool

A comprehensive tool for administering and scoring personality tests, including the Big Five (OCEAN) and Myers-Briggs (MBTI) models.

## Features

- **Big Five (OCEAN) Test**: 50-question assessment of core personality traits.
- **Myers-Briggs (MBTI) Test**: 40-question assessment of psychological preferences.
- **Child-Friendly Mode**: Simplified language for younger audiences (available for both Big Five and MBTI).
- **Web Interface**: Modern React-based frontend with responsive design.
- **CLI Interface**: Python-based command-line tool for quick assessments.
- **PDF Reports**: Generate and download detailed personality profiles.

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application

#### Web Frontend (Recommended)

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

#### CLI Interface

Run the Python script:

```bash
python main.py
```

### Data Conversion

If you modify the YAML configurations in the `config/` directory, you need to regenerate the JSON files for the frontend:

```bash
python scripts/convert_yaml_to_json.py
```

## Development

### Testing

Run frontend unit tests:

```bash
npm test
```

Run backend tests:

```bash
pytest
```

### Build

Build the frontend for production:

```bash
npm run build
```

## License

MIT
