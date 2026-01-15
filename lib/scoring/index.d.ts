export type TestType = "big5" | "mbti";

export interface Question {
  id: string | number;
  trait: string;
  reverse?: boolean;
  text?: string;
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

export function isValidLikertResponse(
  response: unknown,
  maxVal: number
): boolean;

export function scoreLikertItem(
  response: number,
  reverse: boolean,
  maxVal: number
): number;

export function scoreBig5(
  answers: Record<string | number, number>,
  questions: Question[],
  maxVal?: number
): Big5Scores;

export function scoreMBTI(
  answers: Record<string | number, number>,
  questions: Question[],
  maxVal?: number
): MBTIScores;

declare const _default: {
  scoreLikertItem: typeof scoreLikertItem;
  isValidLikertResponse: typeof isValidLikertResponse;
  scoreBig5: typeof scoreBig5;
  scoreMBTI: typeof scoreMBTI;
};

export default _default;
