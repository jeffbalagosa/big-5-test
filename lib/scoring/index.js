/**
 * Shared scoring utilities for Big-5 and MBTI questionnaires.
 * This module is intentionally framework-agnostic so it can be used
 * by both the React frontend and the Python CLI via a Node bridge.
 */

const BIG5_TRAITS = [
  "Openness",
  "Conscientiousness",
  "Extraversion",
  "Agreeableness",
  "Neuroticism",
];

const MBTI_DICHOTOMIES = ["EI", "SN", "TF", "JP"];

const getAnswerForQuestion = (answers, questionId) => {
  if (!answers) return undefined;
  return answers[questionId] ?? answers[String(questionId)];
};

const validateScaleSize = (maxVal) => {
  if (!Number.isInteger(maxVal) || maxVal < 2) {
    throw new Error("maxVal must be an integer >= 2");
  }
};

/**
 * Validates whether a Likert response is an integer between 1 and maxVal.
 * @param {unknown} response Raw response value
 * @param {number} maxVal Maximum scale value
 * @returns {boolean}
 */
export const isValidLikertResponse = (response, maxVal) => {
  return (
    Number.isInteger(response) &&
    typeof maxVal === "number" &&
    !Number.isNaN(maxVal) &&
    response >= 1 &&
    response <= maxVal
  );
};

/**
 * Scores a single Likert response, applying reverse scoring when needed.
 * Throws if the response is outside the allowed range.
 * @param {number} response Raw response (1..maxVal)
 * @param {boolean} reverse Whether the item is reverse-scored
 * @param {number} maxVal Maximum scale value
 * @returns {number}
 */
export const scoreLikertItem = (response, reverse, maxVal) => {
  if (!isValidLikertResponse(response, maxVal)) {
    throw new Error(`Response must be an integer between 1 and ${maxVal}`);
  }
  return reverse ? maxVal + 1 - response : response;
};

const emptyBig5Scores = () => ({
  Openness: 0,
  Conscientiousness: 0,
  Extraversion: 0,
  Agreeableness: 0,
  Neuroticism: 0,
});

const emptyMbtiScores = () => ({ EI: 0, SN: 0, TF: 0, JP: 0 });

const calculatePercentage = (sum, count, maxVal) => {
  if (count === 0) return 50;
  const minScore = count * 1;
  const maxScore = count * maxVal;
  return ((sum - minScore) / (maxScore - minScore)) * 100;
};

/**
 * Scores Big-5 responses and returns percentages for each trait.
 * Non-integer or out-of-range responses are ignored.
 * @param {Record<string | number, number>} answers Map of question id to response
 * @param {Array<{id: string | number, trait: string, reverse?: boolean}>} questions
 * @param {number} [maxVal=5] Maximum scale value
 * @returns {Record<string, number>} Percentages per trait (0-100)
 */
export const scoreBig5 = (answers, questions, maxVal = 5) => {
  validateScaleSize(maxVal);
  if (!Array.isArray(questions)) {
    throw new Error("questions must be an array");
  }

  const totals = emptyBig5Scores();
  const counts = emptyBig5Scores();

  for (const question of questions) {
    if (!BIG5_TRAITS.includes(question.trait)) continue;
    const response = getAnswerForQuestion(answers, question.id);
    if (!isValidLikertResponse(response, maxVal)) continue;
    const scored = scoreLikertItem(response, !!question.reverse, maxVal);
    totals[question.trait] += scored;
    counts[question.trait] += 1;
  }

  const percentages = emptyBig5Scores();
  for (const trait of BIG5_TRAITS) {
    percentages[trait] = Math.round(
      calculatePercentage(totals[trait], counts[trait], maxVal)
    );
  }
  return percentages;
};

/**
 * Scores MBTI responses and returns percentages for each pole plus the 4-letter type code.
 * @param {Record<string | number, number>} answers Map of question id to response
 * @param {Array<{id: string | number, trait: string, reverse?: boolean}>} questions
 * @param {number} [maxVal=6] Maximum scale value
 * @returns {{E:number,I:number,S:number,N:number,T:number,F:number,J:number,P:number,type:string}}
 */
export const scoreMBTI = (answers, questions, maxVal = 6) => {
  validateScaleSize(maxVal);
  if (!Array.isArray(questions)) {
    throw new Error("questions must be an array");
  }

  const totals = emptyMbtiScores();
  const counts = emptyMbtiScores();

  for (const question of questions) {
    if (!MBTI_DICHOTOMIES.includes(question.trait)) continue;
    const response = getAnswerForQuestion(answers, question.id);
    if (!isValidLikertResponse(response, maxVal)) continue;
    const scored = scoreLikertItem(response, !!question.reverse, maxVal);
    totals[question.trait] += scored;
    counts[question.trait] += 1;
  }

  const percentages = {};
  for (const trait of MBTI_DICHOTOMIES) {
    percentages[trait] = calculatePercentage(
      totals[trait],
      counts[trait],
      maxVal
    );
  }

  const type =
    (percentages.EI >= 50 ? "E" : "I") +
    (percentages.SN >= 50 ? "S" : "N") +
    (percentages.TF >= 50 ? "T" : "F") +
    (percentages.JP >= 50 ? "J" : "P");

  return {
    E: Math.round(percentages.EI),
    I: Math.round(100 - percentages.EI),
    S: Math.round(percentages.SN),
    N: Math.round(100 - percentages.SN),
    T: Math.round(percentages.TF),
    F: Math.round(100 - percentages.TF),
    J: Math.round(percentages.JP),
    P: Math.round(100 - percentages.JP),
    type,
  };
};

export default {
  scoreLikertItem,
  isValidLikertResponse,
  scoreBig5,
  scoreMBTI,
};
