import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QuestionnaireProvider, useQuestionnaire } from './useQuestionnaire';
import React from 'react';
import mbtiChildData from '../data/mbti-child.json';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QuestionnaireProvider>{children}</QuestionnaireProvider>
);

describe('useQuestionnaire Hook', () => {
  it('should load questions correctly from JSON data', () => {
    const { result } = renderHook(() => useQuestionnaire(), { wrapper });

    const questions = result.current.getTotalQuestions();
    expect(questions).toBeGreaterThan(0);

    const firstQuestion = result.current.getCurrentQuestion();
    expect(firstQuestion).not.toBeNull();
    expect(firstQuestion?.text).toBeDefined();
    expect(firstQuestion?.id).toBe(1);
  });

  it('should handle test selection and start', () => {
    const { result } = renderHook(() => useQuestionnaire(), { wrapper });

    act(() => {
      result.current.startTest('mbti', false, 'Test User');
    });

    expect(result.current.session.testType).toBe('mbti');
    expect(result.current.session.authorName).toBe('Test User');
    expect(result.current.getCurrentSetIndex()).toBe(0);
  });

  it('should advance to next set when all questions in set are answered', () => {
    const { result } = renderHook(() => useQuestionnaire(), { wrapper });

    const questions = result.current.getQuestionsForCurrentSet();
    expect(questions.length).toBe(3);

    act(() => {
      result.current.answerQuestion(questions[0].id, 5);
    });
    expect(result.current.getCurrentSetIndex()).toBe(0);

    act(() => {
      result.current.answerQuestion(questions[1].id, 5);
    });
    expect(result.current.getCurrentSetIndex()).toBe(0);

    act(() => {
      result.current.answerQuestion(questions[2].id, 5);
    });
    expect(result.current.getCurrentSetIndex()).toBe(1);
  });

  it('should handle undo correctly across set boundaries', () => {
    const { result } = renderHook(() => useQuestionnaire(), { wrapper });

    const questions = result.current.getQuestionsForCurrentSet();

    act(() => {
      result.current.answerQuestion(questions[0].id, 5);
      result.current.answerQuestion(questions[1].id, 5);
      result.current.answerQuestion(questions[2].id, 5);
    });

    expect(result.current.getCurrentSetIndex()).toBe(1);

    act(() => {
      result.current.undoLastAnswer();
    });

    expect(result.current.getCurrentSetIndex()).toBe(0);
    expect(result.current.session.answers[questions[2].id]).toBeUndefined();
    expect(result.current.session.answers[questions[1].id]).toBe(5);
  });

  it('should load child-friendly MBTI questions when selected', () => {
    const { result } = renderHook(() => useQuestionnaire(), { wrapper });

    act(() => {
      result.current.startTest('mbti', true, 'Child User');
    });

    expect(result.current.session.testType).toBe('mbti');
    expect(result.current.session.isChildMode).toBe(true);

    const questions = result.current.getTotalQuestions();
    expect(questions).toBe((mbtiChildData.items ?? []).length);

    const firstQuestion = result.current.getCurrentQuestion();
    expect(firstQuestion?.text).toBe('After hanging out with friends all day, you feel full of energy.');
  });
});
