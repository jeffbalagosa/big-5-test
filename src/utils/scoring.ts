import type { Question, Big5Scores, MBTIScores } from "./types";

export const scoreBig5 = (
  answers: Record<number, number>,
  questions: Question[]
): Big5Scores => {
  const scores: Big5Scores = {
    Openness: 0,
    Conscientiousness: 0,
    Extraversion: 0,
    Agreeableness: 0,
    Neuroticism: 0,
  };

  const counts: Record<string, number> = {
    Openness: 0,
    Conscientiousness: 0,
    Extraversion: 0,
    Agreeableness: 0,
    Neuroticism: 0,
  };

  questions.forEach((q) => {
    const response = answers[q.id];
    if (response !== undefined) {
      const scoredValue = q.reverse ? 6 - response : response;
      scores[q.trait as keyof Big5Scores] += scoredValue;
      counts[q.trait] += 1;
    }
  });

  // Convert to percentages (1-5 scale)
  const percentages: Big5Scores = { ...scores };
  Object.keys(scores).forEach((trait) => {
    const t = trait as keyof Big5Scores;
    if (counts[trait] > 0) {
      const minScore = counts[trait] * 1;
      const maxScore = counts[trait] * 5;
      percentages[t] = Math.round(
        ((scores[t] - minScore) / (maxScore - minScore)) * 100
      );
    } else {
      percentages[t] = 0;
    }
  });

  return percentages;
};

export const scoreMBTI = (
  answers: Record<number, number>,
  questions: Question[]
): MBTIScores => {
  const sums: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
  const counts: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };

  questions.forEach((q) => {
    const response = answers[q.id];
    if (response !== undefined) {
      const scoredValue = q.reverse ? 6 - response : response;
      if (sums[q.trait] !== undefined) {
        sums[q.trait] += scoredValue;
        counts[q.trait] += 1;
      }
    }
  });

  const percentages: Record<string, number> = {};
  Object.keys(sums).forEach((trait) => {
    if (counts[trait] > 0) {
      const minScore = counts[trait] * 1;
      const maxScore = counts[trait] * 5;
      percentages[trait] =
        ((sums[trait] - minScore) / (maxScore - minScore)) * 100;
    } else {
      percentages[trait] = 50;
    }
  });

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
