# Tasks: Add React Frontend

## 1. Project Setup

- [x] Install CSS reset or normalize
- [x] Create theme constants with color scheme
- [x] Set up CSS custom properties in index.css
- [x] Create folder structure for components, pages, hooks, data

## 2. Convert Questionnaire Data

- [x] Create script to convert YAML configs to JSON
- [x] Generate questionnaire.json from questionnaire.yaml
- [x] Generate questionnaire-child.json from questionnaire-child.yaml
- [x] Generate mbti.json from mbti.yaml

## 3. Implement Core Components

- [x] Create NavigationDrawer component with navigation links
- [x] Create MainLayout component wrapping app with drawer
- [x] Create LikertScale component (1-5 buttons with labels)
- [x] Create QuestionCard component for displaying questions
- [x] Create ProgressBar component for questionnaire progress

## 4. Implement Pages

- [x] Create HomePage with welcome message and "Start Test" CTA
- [x] Create TestSelectionPage with:
  - Test type dropdown (Big-5 / MBTI)
  - Child mode checkbox (disabled for MBTI)
  - Author name input
  - Start button
- [x] Create QuestionnairePage with:
  - Question display
  - Likert scale response
  - Progress indicator
  - Undo button
  - Navigation between questions
- [x] Create ResultsPage with score display

## 5. Implement Scoring Logic

- [x] Port Big-5 scoring logic from Python to TypeScript
- [x] Port MBTI scoring logic from Python to TypeScript
- [x] Include reverse-scoring support
- [x] Add unit tests for scoring functions

## 6. Implement Results Visualization

- [x] Create ScoreChart component (bar chart for Big-5)
- [x] Create MBTI diverging chart component
- [x] Create ResultsSummary with percentage breakdowns

## 7. Add PDF Export

- [x] Install jsPDF or similar library
- [x] Implement PDF generation with chart and scores
- [x] Add download button on results page

## 8. Implement State Management

- [x] Create QuestionnaireContext for session state
- [x] Implement useQuestionnaire hook for test flow
- [x] Handle undo functionality

## 9. Styling and Polish

- [x] Apply color scheme to all components
- [x] Implement responsive navigation drawer
- [x] Add mobile-friendly Likert scale
- [x] Ensure consistent typography

## 10. Testing

- [x] Add component tests for key UI components
- [x] Add integration tests for questionnaire flow
- [x] Test scoring accuracy against Python implementation

## 11. Documentation

- [x] Update README with frontend usage instructions
- [x] Document how to run dev server
- [x] Document build process
