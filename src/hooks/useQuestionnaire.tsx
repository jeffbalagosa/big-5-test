/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { TestType, TestSession, Question } from '../utils/types';
import big5Data from '../data/questionnaire.json';
import big5ChildData from '../data/questionnaire-child.json';
import mbtiData from '../data/mbti.json';
import mbtiChildData from '../data/mbti-child.json';

type QuestionItem = Omit<Question, 'id'> & Partial<Pick<Question, 'id'>>;
type QuestionnaireJson = { items?: QuestionItem[] };

interface QuestionnaireContextType {
  session: TestSession;
  startTest: (type: TestType, isChildMode: boolean, authorName: string) => void;
  answerQuestion: (questionId: number, value: number) => void;
  undoLastAnswer: () => void;
  resetTest: () => void;
  getCurrentQuestion: () => Question | null;
  getTotalQuestions: () => number;
  getQuestionCount: (type: TestType, isChildMode: boolean) => number;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<TestSession>({
    testType: 'big5',
    isChildMode: false,
    authorName: '',
    answers: {},
    currentQuestionIndex: 0,
    isCompleted: false,
  });

  const getQuestions = useCallback((type: TestType, isChildMode: boolean): Question[] => {
    let rawItems: QuestionItem[] = [];
    if (type === 'big5') {
      rawItems =
        ((isChildMode
          ? (big5ChildData as unknown as QuestionnaireJson).items
          : (big5Data as unknown as QuestionnaireJson).items) ?? []) as QuestionItem[];
    } else {
      rawItems =
        ((isChildMode
          ? (mbtiChildData as unknown as QuestionnaireJson).items
          : (mbtiData as unknown as QuestionnaireJson).items) ?? []) as QuestionItem[];
    }

    return rawItems.map((item, index) => ({
      ...item,
      id: item.id || index + 1,
    })) as Question[];
  }, []);

  const startTest = (type: TestType, isChildMode: boolean, authorName: string) => {
    setSession({
      testType: type,
      isChildMode,
      authorName,
      answers: {},
      currentQuestionIndex: 0,
      isCompleted: false,
    });
  };

  const answerQuestion = (questionId: number, value: number) => {
    setSession((prev) => {
      const newAnswers = { ...prev.answers, [questionId]: value };
      const questions = getQuestions(prev.testType, prev.isChildMode);
      const isLastQuestion = prev.currentQuestionIndex === questions.length - 1;

      return {
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
        isCompleted: isLastQuestion,
      };
    });
  };

  const undoLastAnswer = () => {
    setSession((prev) => {
      if (prev.currentQuestionIndex === 0 && Object.keys(prev.answers).length === 0) return prev;

      const questions = getQuestions(prev.testType, prev.isChildMode);
      const newIndex = Math.max(0, prev.currentQuestionIndex - 1);
      const lastQuestionId = questions[newIndex].id;

      const newAnswers = { ...prev.answers };
      delete newAnswers[lastQuestionId];

      return {
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: newIndex,
        isCompleted: false,
      };
    });
  };

  const resetTest = () => {
    setSession((prev) => ({
      ...prev,
      answers: {},
      currentQuestionIndex: 0,
      isCompleted: false,
    }));
  };

  const getCurrentQuestion = (): Question | null => {
    const questions = getQuestions(session.testType, session.isChildMode);
    return questions[session.currentQuestionIndex] || null;
  };

  const getTotalQuestions = (): number => {
    const questions = getQuestions(session.testType, session.isChildMode);
    return questions.length;
  };

  const getQuestionCount = (type: TestType, isChildMode: boolean): number => {
    return getQuestions(type, isChildMode).length;
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        session,
        startTest,
        answerQuestion,
        undoLastAnswer,
        resetTest,
        getCurrentQuestion,
        getTotalQuestions,
        getQuestionCount,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};
