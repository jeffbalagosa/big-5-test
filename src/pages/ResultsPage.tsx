import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../hooks/useQuestionnaire';
import { COLORS } from '../styles/theme';
import { scoreBig5, scoreMBTI } from '../utils/scoring';
import { exportToPDF } from '../utils/pdfExport';
import ScoreChart from '../components/Results/ScoreChart';
import MBTIDivergingChart from '../components/Results/MBTIDivergingChart';
import { Download, RefreshCw, Home } from 'lucide-react';
import big5Data from '../data/questionnaire.json';
import big5ChildData from '../data/questionnaire-child.json';
import mbtiData from '../data/mbti.json';
import type { Big5Scores, MBTIScores, Question } from '../utils/types';

type QuestionItem = Omit<Question, 'id'> & Partial<Pick<Question, 'id'>>;
type QuestionnaireJson = { items?: QuestionItem[] };

type Results =
  | { type: 'big5'; scores: Big5Scores }
  | { type: 'mbti'; scores: MBTIScores };

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { session, resetTest } = useQuestionnaire();

  const results = useMemo<Results>(() => {
    let rawItems: QuestionItem[] = [];
    if (session.testType === 'big5') {
      rawItems =
        ((session.isChildMode
          ? (big5ChildData as unknown as QuestionnaireJson).items
          : (big5Data as unknown as QuestionnaireJson).items) ?? []) as QuestionItem[];
    } else {
      rawItems = ((mbtiData as unknown as QuestionnaireJson).items ?? []) as QuestionItem[];
    }

    const questions = rawItems.map((item, index) => ({
      ...item,
      id: item.id || index + 1,
    })) as Question[];

    if (session.testType === 'big5') {
      return { type: 'big5', scores: scoreBig5(session.answers, questions) };
    } else {
      return { type: 'mbti', scores: scoreMBTI(session.answers, questions) };
    }
  }, [session]);

  const handleRetake = () => {
    resetTest();
    navigate('/questionnaire');
  };

  const handleDownloadPDF = () => {
    exportToPDF(
      session.testType,
      results.scores,
      session.authorName,
      session.isChildMode
    );
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Your Results</h1>
        <p style={{ opacity: 0.7 }}>
          {session.authorName ? `Prepared for ${session.authorName}` : 'Personality Profile'}
        </p>
      </div>

      <div
        style={{
          backgroundColor: COLORS.white,
          padding: '2.5rem',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
          border: `1px solid ${COLORS.teaGreen}`,
          marginBottom: '3rem',
        }}
      >
        {results.type === 'big5' ? (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Big Five Personality Traits</h2>
            <ScoreChart scores={results.scores} />
          </>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  color: COLORS.midnightViolet,
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                }}
              >
                {results.scores.type}
              </div>
              <h2 style={{ margin: 0 }}>Myers-Briggs Type Indicator</h2>
            </div>
            <MBTIDivergingChart scores={results.scores} />
          </>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleDownloadPDF}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: COLORS.charcoalBlue,
            color: COLORS.white,
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
          }}
        >
          <Download size={18} /> Download PDF
        </button>
        <button
          onClick={handleRetake}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: COLORS.white,
            color: COLORS.charcoalBlue,
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: `2px solid ${COLORS.teaGreen}`,
            fontWeight: 'bold',
          }}
        >
          <RefreshCw size={18} /> Retake Test
        </button>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: COLORS.white,
            color: COLORS.charcoalBlue,
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: `2px solid ${COLORS.teaGreen}`,
            fontWeight: 'bold',
          }}
        >
          <Home size={18} /> Home
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
