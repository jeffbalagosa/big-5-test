import React from 'react';
import QuestionCard from './QuestionCard';
import type { Question, TestType } from '../../utils/types';

interface QuestionSetProps {
  questions: Question[];
  totalQuestions: number;
  startIndex: number;
  answers: Record<number, number>;
  onAnswer: (questionId: number, value: number) => void;
  testType: TestType;
}

const QuestionSet: React.FC<QuestionSetProps> = ({
  questions,
  totalQuestions,
  startIndex,
  answers,
  onAnswer,
  testType,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          questionNumber={startIndex + index + 1}
          totalQuestions={totalQuestions}
          questionText={question.text}
          selectedValue={answers[question.id] ?? null}
          onSelect={(value) => onAnswer(question.id, value)}
          testType={testType}
        />
      ))}
    </div>
  );
};

export default QuestionSet;
