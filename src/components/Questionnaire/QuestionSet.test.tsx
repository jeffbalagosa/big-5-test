import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionSet from './QuestionSet';
import React from 'react';
import type { Question } from '../../utils/types';

describe('QuestionSet Component', () => {
  const mockQuestions: Question[] = [
    { id: 1, text: 'Question 1', trait: 'O' },
    { id: 2, text: 'Question 2', trait: 'C' },
    { id: 3, text: 'Question 3', trait: 'E' },
  ];

  const mockOnAnswer = vi.fn();

  it('renders all questions in the set', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        totalQuestions={50}
        answers={{}}
        onAnswer={mockOnAnswer}
        testType="big5"
      />
    );

    expect(screen.getByText('Question 1')).toBeDefined();
    expect(screen.getByText('Question 2')).toBeDefined();
    expect(screen.getByText('Question 3')).toBeDefined();
    expect(screen.getByText(/Question 1 of 50/i)).toBeDefined();
    expect(screen.getByText(/Question 2 of 50/i)).toBeDefined();
    expect(screen.getByText(/Question 3 of 50/i)).toBeDefined();
  });

  it('calls onAnswer when a question is answered', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        totalQuestions={50}
        answers={{}}
        onAnswer={mockOnAnswer}
        testType="big5"
      />
    );

    const options = screen.getAllByText('4');
    fireEvent.click(options[0]); // Answer first question

    expect(mockOnAnswer).toHaveBeenCalledWith(1, 4);
  });

  it('shows checkmark for answered questions', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        totalQuestions={50}
        answers={{ 1: 4 }}
        onAnswer={mockOnAnswer}
        testType="big5"
      />
    );

    // Question 1 should have a checkmark
    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks.length).toBe(1);
  });
});
