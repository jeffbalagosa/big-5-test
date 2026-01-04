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
  getQuestionsForCurrentSet: () => Question[];
  getCurrentSetIndex: () => number;
  getTotalSets: () => number;
  getTotalQuestions: () => number;
  getQuestionCount: (type: TestType, isChildMode: boolean) => number;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

const QUESTIONS_PER_SET = 3;

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<TestSession>({
    testType: 'big5',
    isChildMode: false,
    authorName: '',
    answers: {},
    currentSetIndex: 0,
    answerOrder: [],
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
      currentSetIndex: 0,
      answerOrder: [],
      isCompleted: false,
    });
  };

  const answerQuestion = (questionId: number, value: number) => {
    setSession((prev) => {
      const newAnswers = { ...prev.answers, [questionId]: value };
      const newAnswerOrder = [
        ...prev.answerOrder.filter((id) => id !== questionId),
        questionId,
      ];

      const questions = getQuestions(prev.testType, prev.isChildMode);
      const questionsPerSet = QUESTIONS_PER_SET;

      const startIdx = prev.currentSetIndex * questionsPerSet;
      const endIdx = Math.min(startIdx + questionsPerSet, questions.length);
      const currentSetQuestions = questions.slice(startIdx, endIdx);

      const allAnsweredInSet = currentSetQuestions.every((q) => newAnswers[q.id] !== undefined);

      if (allAnsweredInSet) {
        const isLastSet = endIdx === questions.length;
        if (isLastSet) {
          return {
            ...prev,
            answers: newAnswers,
            answerOrder: newAnswerOrder,
            isCompleted: true,
          };
        } else {
          return {
            ...prev,
            answers: newAnswers,
            answerOrder: newAnswerOrder,
            currentSetIndex: prev.currentSetIndex + 1,
          };
        }
      }

      return {
        ...prev,
        answers: newAnswers,
        answerOrder: newAnswerOrder,
      };
    });
  };

  const undoLastAnswer = () => {
    setSession((prev) => {
      if (prev.answerOrder.length === 0) return prev;

      const newAnswerOrder = [...prev.answerOrder];
      const lastQuestionId = newAnswerOrder.pop();
      if (lastQuestionId === undefined) return prev;

      const newAnswers = { ...prev.answers };
      delete newAnswers[lastQuestionId];

      const questions = getQuestions(prev.testType, prev.isChildMode);
      const questionsPerSet = QUESTIONS_PER_SET;

      // Recalculate currentSetIndex based on the new state of answers
      // We want to be on the set that contains the question we just un-answered
      const questionIndex = questions.findIndex((q) => q.id === lastQuestionId);
      const newSetIndex = Math.floor(questionIndex / questionsPerSet);

      return {
        ...prev,
        answers: newAnswers,
        answerOrder: newAnswerOrder,
        currentSetIndex: newSetIndex,
        isCompleted: false,
      };
    });
  };

  const resetTest = () => {
    setSession((prev) => ({
      ...prev,
      answers: {},
      currentSetIndex: 0,
      answerOrder: [],
      isCompleted: false,
    }));
  };

  const getCurrentQuestion = (): Question | null => {
    const questions = getQuestions(session.testType, session.isChildMode);
    // For backward compatibility, return the first unanswered question in the current set
    const questionsPerSet = QUESTIONS_PER_SET;
    const startIdx = session.currentSetIndex * questionsPerSet;
    const endIdx = Math.min(startIdx + questionsPerSet, questions.length);
    const currentSetQuestions = questions.slice(startIdx, endIdx);

    return currentSetQuestions.find(q => session.answers[q.id] === undefined) || currentSetQuestions[0] || null;
  };

  const getQuestionsForCurrentSet = (): Question[] => {
    const questions = getQuestions(session.testType, session.isChildMode);
    const questionsPerSet = QUESTIONS_PER_SET;
    const startIdx = session.currentSetIndex * questionsPerSet;
    const endIdx = Math.min(startIdx + questionsPerSet, questions.length);
    return questions.slice(startIdx, endIdx);
  };

  const getCurrentSetIndex = (): number => {
    return session.currentSetIndex;
  };

  const getTotalSets = (): number => {
    const questions = getQuestions(session.testType, session.isChildMode);
    return Math.ceil(questions.length / QUESTIONS_PER_SET);
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
        getQuestionsForCurrentSet,
        getCurrentSetIndex,
        getTotalSets,
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
