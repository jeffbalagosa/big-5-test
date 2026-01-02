import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QuestionnaireProvider } from './hooks/useQuestionnaire'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuestionnaireProvider>
      <App />
    </QuestionnaireProvider>
  </StrictMode>,
)
