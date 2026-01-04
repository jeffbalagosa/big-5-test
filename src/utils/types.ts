export type TestType = "big5" | "mbti";

export interface Question {
  id: number;
  text: string;
  trait: string;
  reverse?: boolean;
}

export interface QuestionnaireData {
  title: string;
  description: string;
  questions: Question[];
}

export interface TestSession {
  testType: TestType;
  isChildMode: boolean;
  authorName: string;
  answers: Record<number, number>;
  currentQuestionIndex: number;
  currentSetIndex: number;
  answerOrder: number[];
  isCompleted: boolean;
}

export interface Big5Scores {
  Openness: number;
  Conscientiousness: number;
  Extraversion: number;
  Agreeableness: number;
  Neuroticism: number;
}

export interface MBTIScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
  type: string;
}
