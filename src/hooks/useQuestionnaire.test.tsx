import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QuestionnaireProvider, useQuestionnaire, STORAGE_KEY } from './useQuestionnaire';
import React from 'react';
import mbtiChildData from '../data/mbti-child.json';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QuestionnaireProvider>{children}</QuestionnaireProvider>
);

describe('useQuestionnaire Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should load questions correctly from JSON data', () => {
    const { result } = renderHook(() => useQuestionnaire(), { wrapper });

    const questions = result.current.getTotalQuestions();
    expect(questions).toBeGreaterThan(0);

    const firstQuestion = result.current.getCurrentQuestion();
    expect(firstQuestion).not.toBeNull();
    expect(firstQuestion?.text).toBeDefined();
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

  it('should undo the most recently modified answer, even if it was already answered', () => {
    const { result } = renderHook(() => useQuestionnaire(), { wrapper });

    const questions = result.current.getQuestionsForCurrentSet();

    act(() => {
      result.current.answerQuestion(questions[0].id, 5);
      result.current.answerQuestion(questions[1].id, 5);
    });

    // Modify the first answer
    act(() => {
      result.current.answerQuestion(questions[0].id, 1);
    });

    // Undo should remove the modification to the first answer (currently it deletes it)
    act(() => {
      result.current.undoLastAnswer();
    });

    expect(result.current.session.answers[questions[0].id]).toBeUndefined();
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

  describe('Persistence', () => {
    it('should save session to localStorage when progress is made', () => {
      const { result } = renderHook(() => useQuestionnaire(), { wrapper });

      act(() => {
        result.current.startTest('big5', false, 'Test User');
      });

      const savedString = localStorage.getItem(STORAGE_KEY);
      expect(savedString).not.toBeNull();
      const saved = JSON.parse(savedString!);
      expect(saved.authorName).toBe('Test User');
    });

    it('should restore session from localStorage on initialization', () => {
      const mockSession = {
        testType: 'mbti',
        isChildMode: true,
        authorName: 'Stored User',
        answers: { '1': 5 },
        currentSetIndex: 0,
        answerOrder: [1],
        isCompleted: false,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockSession));

      const { result } = renderHook(() => useQuestionnaire(), { wrapper });

      expect(result.current.session.authorName).toBe('Stored User');
      expect(result.current.session.testType).toBe('mbti');
      expect(result.current.session.answers[1]).toBe(5);
    });

    it('should clear localStorage on resetTest', () => {
      const { result } = renderHook(() => useQuestionnaire(), { wrapper });

      act(() => {
        result.current.startTest('big5', false, 'Test User');
      });

      expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();

      act(() => {
        result.current.resetTest();
      });

      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });
  });
});
