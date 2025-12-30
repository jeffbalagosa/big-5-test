import React from 'react';
import { COLORS } from '../../styles/theme';
import LikertScale from './LikertScale';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  selectedValue,
  onSelect,
}) => {
  return (
    <div
      style={{
        backgroundColor: COLORS.white,
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: `1px solid ${COLORS.teaGreen}`,
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          fontSize: '0.875rem',
          color: COLORS.midnightViolet,
          fontWeight: 'bold',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Question {questionNumber} of {totalQuestions}
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

      <LikertScale value={selectedValue} onChange={onSelect} />
    </div>
  );
};

export default QuestionCard;
