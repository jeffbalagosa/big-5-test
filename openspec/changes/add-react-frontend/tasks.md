# Tasks: Add React Frontend

## 1. Project Setup

- [ ] Install CSS reset or normalize
- [ ] Create theme constants with color scheme
- [ ] Set up CSS custom properties in index.css
- [ ] Create folder structure for components, pages, hooks, data

## 2. Convert Questionnaire Data

- [ ] Create script to convert YAML configs to JSON
- [ ] Generate questionnaire.json from questionnaire.yaml
- [ ] Generate questionnaire-child.json from questionnaire-child.yaml
- [ ] Generate mbti.json from mbti.yaml

## 3. Implement Core Components

- [ ] Create NavigationDrawer component with navigation links
- [ ] Create MainLayout component wrapping app with drawer
- [ ] Create LikertScale component (1-5 buttons with labels)
- [ ] Create QuestionCard component for displaying questions
- [ ] Create ProgressBar component for questionnaire progress

## 4. Implement Pages

- [ ] Create HomePage with welcome message and "Start Test" CTA
- [ ] Create TestSelectionPage with:
  - Test type dropdown (Big-5 / MBTI)
  - Child mode checkbox (disabled for MBTI)
  - Author name input
  - Start button
- [ ] Create QuestionnairePage with:
  - Question display
  - Likert scale response
  - Progress indicator
  - Undo button
  - Navigation between questions
- [ ] Create ResultsPage with score display

## 5. Implement Scoring Logic

- [ ] Port Big-5 scoring logic from Python to TypeScript
- [ ] Port MBTI scoring logic from Python to TypeScript
- [ ] Include reverse-scoring support
- [ ] Add unit tests for scoring functions

## 6. Implement Results Visualization

- [ ] Create ScoreChart component (bar chart for Big-5)
- [ ] Create MBTI diverging chart component
- [ ] Create ResultsSummary with percentage breakdowns

## 7. Add PDF Export

- [ ] Install jsPDF or similar library
- [ ] Implement PDF generation with chart and scores
- [ ] Add download button on results page

## 8. Implement State Management

- [ ] Create QuestionnaireContext for session state
- [ ] Implement useQuestionnaire hook for test flow
- [ ] Handle undo functionality

## 9. Styling and Polish

- [ ] Apply color scheme to all components
- [ ] Implement responsive navigation drawer
- [ ] Add mobile-friendly Likert scale
- [ ] Ensure consistent typography

## 10. Testing

- [ ] Add component tests for key UI components
- [ ] Add integration tests for questionnaire flow
- [ ] Test scoring accuracy against Python implementation

## 11. Documentation

- [ ] Update README with frontend usage instructions
- [ ] Document how to run dev server
- [ ] Document build process
