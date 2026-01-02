import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestionnaireProvider } from './hooks/useQuestionnaire';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import TestSelectionPage from './pages/TestSelectionPage';
import QuestionnairePage from './pages/QuestionnairePage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import './App.css';

function App() {
  return (
    <QuestionnaireProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test-selection" element={<TestSelectionPage />} />
            <Route path="/questionnaire" element={<QuestionnairePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </QuestionnaireProvider>
  );
}

export default App;
