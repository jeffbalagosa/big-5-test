# Change: Add React Frontend for Questionnaire

## Why

The current application is CLI-only, limiting accessibility for users who prefer graphical interfaces. A React frontend will provide a modern, user-friendly web interface for taking personality tests, making the tool more accessible to a broader audience.

## What Changes

- Add a React-based single-page application (SPA) with navigation drawer
- Implement questionnaire UI with the same test options as the CLI:
  - Test type selection (Big-5 / MBTI)
  - Child-friendly questionnaire option (Big-5 only)
  - Author name input for reports
- Apply project color scheme (Tea Green, Charcoal Blue, Golden Pollen, White, Midnight Violet)
- Questionnaire will use the same YAML configurations as the Python backend
- Results display with score visualization
- PDF export capability (via backend API or client-side generation)

## Impact

- Affected specs: `personality-tests` (adding frontend capability), new `react-frontend` spec
- Affected code:
  - `src/` directory (currently boilerplate Vite+React)
  - May need a simple API layer to connect React frontend to Python backend for scoring and PDF generation
