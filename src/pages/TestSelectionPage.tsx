import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../hooks/useQuestionnaire';
import { COLORS } from '../styles/theme';
import { Play, Info } from 'lucide-react';
import type { TestType } from '../utils/types';

const TestSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { startTest, getQuestionCount } = useQuestionnaire();

  const [testType, setTestType] = useState<TestType>('big5');
  const [isChildMode, setIsChildMode] = useState(false);
  const [authorName, setAuthorName] = useState('');

  const handleStart = () => {
    startTest(testType, isChildMode, authorName);
    navigate('/questionnaire');
  };

  const totalQuestions = getQuestionCount(testType, isChildMode);
  const estimateDurationMinutes = (questionCount: number): { min: number; max: number } => {
    // Heuristic: fast readers ~8 questions/min, slower pace ~4 questions/min.
    const min = Math.max(1, Math.ceil(questionCount / 8));
    const max = Math.max(min, Math.ceil(questionCount / 4));
    return { min, max };
  };
  const duration = estimateDurationMinutes(totalQuestions);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Configure Your Test</h1>

      <div
        style={{
          backgroundColor: COLORS.white,
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: `1px solid ${COLORS.teaGreen}`,
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            htmlFor="test-type-select"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              color: COLORS.charcoalBlue,
            }}
          >
            Select Test Type
          </label>
          <select
            id="test-type-select"
            value={testType}
            onChange={(e) => {
              const val = e.target.value as TestType;
              setTestType(val);
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: `1px solid ${COLORS.teaGreen}`,
              fontSize: '1rem',
              backgroundColor: COLORS.white,
            }}
          >
            <option value="big5">Big Five (OCEAN)</option>
            <option value="mbti">Myers-Briggs (MBTI)</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={isChildMode}
              onChange={(e) => setIsChildMode(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span style={{ fontWeight: 'bold', color: COLORS.charcoalBlue }}>
              Child-Friendly Mode
            </span>
          </label>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', opacity: 0.7 }}>
            Uses simplified language suitable for children and adolescents.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              color: COLORS.charcoalBlue,
            }}
          >
            Your Name (Optional)
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Enter name for the report"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: `1px solid ${COLORS.teaGreen}`,
              fontSize: '1rem',
            }}
          />
        </div>

        <button
          onClick={handleStart}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            backgroundColor: COLORS.goldenPollen,
            color: COLORS.charcoalBlue,
            padding: '1rem',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            border: 'none',
            transition: 'background-color 0.2s',
          }}
        >
          <Play size={20} fill="currentColor" /> Start Test
        </button>
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: COLORS.teaGreen + 'CC',
          border: `1px solid ${COLORS.teaGreen}`,
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Info size={20} style={{ color: COLORS.charcoalBlue, flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontSize: '0.875rem', margin: 0, lineHeight: '1.5' }}>
          The {testType === 'big5' ? 'Big Five' : 'MBTI'} test consists of {totalQuestions} questions and
          takes about {duration.min}-{duration.max} minutes to complete.
        </p>
      </div>
    </div>
  );
};

export default TestSelectionPage;
