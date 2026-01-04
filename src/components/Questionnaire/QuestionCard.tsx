import React from 'react';
import { COLORS } from '../../styles/theme';
import LikertScale from './LikertScale';
import { FIVE_POINT_SCALE, SIX_POINT_SCALE } from './LikertScale.types';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { TestType } from '../../utils/types';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  testType?: TestType;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  selectedValue,
  onSelect,
  testType = 'big5',
}) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isAnswered = selectedValue !== null;

  const options = testType === 'mbti' ? SIX_POINT_SCALE : FIVE_POINT_SCALE;

  return (
    <div
      style={{
        backgroundColor: COLORS.white,
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: isAnswered
          ? `0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 2px ${COLORS.teaGreen}`
          : '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: `1px solid ${isAnswered ? COLORS.teaGreen : COLORS.teaGreen}`,
        width: '100%',
        minWidth: isDesktop ? '600px' : 'auto',
        maxWidth: '800px',
        margin: '0 auto',
        transition: 'all 0.2s ease-in-out',
        opacity: isAnswered ? 0.95 : 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            fontSize: '0.875rem',
            color: COLORS.midnightViolet,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Question {questionNumber} of {totalQuestions}
        </div>
        {isAnswered && (
          <div
            style={{
              color: COLORS.teaGreen,
              fontSize: '1.25rem',
              fontWeight: 'bold',
            }}
          >
            ✓
          </div>
        )}
      </div>

      <h2
        style={{
          fontSize: '1.5rem',
          lineHeight: '1.4',
          marginBottom: '2.5rem',
          color: COLORS.charcoalBlue,
        }}
      >
        {questionText}
      </h2>

      <LikertScale value={selectedValue} onChange={onSelect} options={options} />
    </div>
  );
};

export default QuestionCard;
