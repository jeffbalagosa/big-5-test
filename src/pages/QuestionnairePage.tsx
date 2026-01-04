import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../hooks/useQuestionnaire';
import { COLORS } from '../styles/theme';
import QuestionSet from '../components/Questionnaire/QuestionSet';
import ProgressBar from '../components/Questionnaire/ProgressBar';
import { Undo2, ArrowLeft } from 'lucide-react';

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    session,
    getQuestionsForCurrentSet,
    getTotalQuestions,
    getCurrentSetIndex,
    getTotalSets,
    answerQuestion,
    undoLastAnswer,
  } = useQuestionnaire();

  const currentQuestions = getQuestionsForCurrentSet();
  const totalQuestions = getTotalQuestions();
  const currentSetIndex = getCurrentSetIndex();
  const totalSets = getTotalSets();

  useEffect(() => {
    if (session.isCompleted) {
      navigate('/results');
    }
  }, [session.isCompleted, navigate]);

  if (currentQuestions.length === 0) {
    return <div>Loading...</div>;
  }

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
          disabled={session.answerOrder.length === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: COLORS.charcoalBlue,
            cursor: session.answerOrder.length === 0 ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            opacity: session.answerOrder.length === 0 ? 0.3 : 1,
          }}
        >
          <Undo2 size={18} /> Undo
        </button>
      </div>

      <ProgressBar current={currentSetIndex} total={totalSets} />

      <div style={{ marginBottom: '1rem', textAlign: 'right', color: COLORS.charcoalBlue, fontSize: '0.875rem', fontWeight: 'bold' }}>
        Set {currentSetIndex + 1} of {totalSets}
      </div>

      <QuestionSet
        questions={currentQuestions}
        totalQuestions={totalQuestions}
        answers={session.answers}
        onAnswer={answerQuestion}
        testType={session.testType}
      />

      <div style={{ marginTop: '2rem', textAlign: 'center', color: COLORS.charcoalBlue, fontSize: '0.75rem', fontWeight: 500 }}>
        Your progress is saved automatically.
      </div>
    </div>
  );
};

export default QuestionnairePage;
