import type { Question, Big5Scores, MBTIScores } from "./index.js";
import { scoreBig5, scoreMBTI } from "./index.js";

const big5Questions: Question[] = [
  { id: 1, trait: "Openness", reverse: false, text: "Q1" },
  { id: 2, trait: "Conscientiousness", reverse: true, text: "Q2" },
];

const big5Answers = { 1: 5, 2: 2 } satisfies Record<string | number, number>;
const big5Scores: Big5Scores = scoreBig5(big5Answers, big5Questions);

const mbtiQuestions: Question[] = [
  { id: 1, trait: "EI", reverse: false },
  { id: 2, trait: "EI", reverse: true },
];

const mbtiAnswers = { 1: 6, 2: 1 } satisfies Record<string | number, number>;
const mbtiScores: MBTIScores = scoreMBTI(mbtiAnswers, mbtiQuestions);

// Basic structural assertions for the type checker
const ensureString: string = mbtiScores.type;
const ensureNumber: number = big5Scores.Openness;
void ensureString;
void ensureNumber;
