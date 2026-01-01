import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../hooks/useQuestionnaire';
import { COLORS } from '../styles/theme';
import QuestionCard from '../components/Questionnaire/QuestionCard';
import ProgressBar from '../components/Questionnaire/ProgressBar';
import { Undo2, ArrowLeft } from 'lucide-react';

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    session,
    getCurrentQuestion,
    getTotalQuestions,
    answerQuestion,
    undoLastAnswer,
  } = useQuestionnaire();

  const currentQuestion = getCurrentQuestion();
  const totalQuestions = getTotalQuestions();

  useEffect(() => {
    if (session.isCompleted) {
      navigate('/results');
    }
  }, [session.isCompleted, navigate]);

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const handleSelect = (value: number) => {
    answerQuestion(currentQuestion.id, value);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button
          onClick={() => navigate('/test-selection')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: COLORS.charcoalBlue,
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 'bold',
          }}
        >
          <ArrowLeft size={18} /> Quit Test
        </button>

        <button
          onClick={undoLastAnswer}
          disabled={session.currentQuestionIndex === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: COLORS.charcoalBlue,
            cursor: session.currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            opacity: session.currentQuestionIndex === 0 ? 0.3 : 1,
          }}
        >
          <Undo2 size={18} /> Undo
        </button>
      </div>

      <ProgressBar current={session.currentQuestionIndex} total={totalQuestions} />

      <QuestionCard
        questionNumber={session.currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        questionText={currentQuestion.text}
        selectedValue={session.answers[currentQuestion.id] || null}
        onSelect={handleSelect}
      />

      <div style={{ marginTop: '2rem', textAlign: 'center', color: COLORS.charcoalBlue, fontSize: '0.75rem', fontWeight: 500 }}>
        Your progress is saved automatically.
      </div>
    </div>
  );
};

export default QuestionnairePage;
