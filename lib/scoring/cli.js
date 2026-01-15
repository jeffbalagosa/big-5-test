#!/usr/bin/env node
import { scoreBig5, scoreMBTI, isValidLikertResponse } from "./index.js";

const readStdin = async () =>
  new Promise((resolve, reject) => {
    let body = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      body += chunk;
    });
    process.stdin.on("end", () => resolve(body));
    process.stdin.on("error", (err) => reject(err));
  });

const sendJson = (payload, exitCode = 0) => {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
  process.exitCode = exitCode;
};

const handleFatal = (err) => {
  sendJson({ ok: false, error: err?.message ?? String(err) }, 1);
};

process.on("uncaughtException", handleFatal);
process.on("unhandledRejection", handleFatal);

const parseInput = (raw) => {
  try {
    return JSON.parse(raw || "{}");
  } catch (err) {
    throw new Error("Invalid JSON input");
  }
};

const normalizeQuestions = (questions) => {
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("questions must be a non-empty array");
  }
  return questions.map((q, idx) => {
    if (!q || typeof q !== "object") {
      throw new Error(`Question at index ${idx} must be an object`);
    }
    if (!q.trait) {
      throw new Error(`Question at index ${idx} is missing a trait`);
    }
    return {
      ...q,
      id: q.id ?? idx,
      reverse: Boolean(q.reverse),
    };
  });
};

const normalizeAnswers = (answers, questions) => {
  if (Array.isArray(answers)) {
    if (answers.length !== questions.length) {
      throw new Error("answers length must match questions length");
    }
    return Object.fromEntries(
      questions.map((q, idx) => [q.id ?? idx, answers[idx]])
    );
  }

  if (answers && typeof answers === "object") {
    return answers;
  }

  throw new Error(
    "answers must be an array or an object mapping ids to responses"
  );
};

const validateResponses = (answersMap, questions, maxVal) => {
  for (const question of questions) {
    const response = answersMap[question.id] ?? answersMap[String(question.id)];
    if (!isValidLikertResponse(response, maxVal)) {
      throw new Error(
        `Response for question ${question.id} must be an integer between 1 and ${maxVal}`
      );
    }
  }
};

const resolveMaxVal = (testType, maxVal) => {
  if (typeof maxVal === "number" && Number.isFinite(maxVal)) return maxVal;
  return testType === "big5" ? 5 : 6;
};

const main = async () => {
  try {
    const raw = await readStdin();
    const payload = parseInput(raw);
    const { answers, questions, test_type: testType, maxVal } = payload;

    if (testType !== "big5" && testType !== "mbti") {
      throw new Error("test_type must be 'big5' or 'mbti'");
    }

    const normalizedQuestions = normalizeQuestions(questions);
    const resolvedMaxVal = resolveMaxVal(testType, maxVal);
    const normalizedAnswers = normalizeAnswers(answers, normalizedQuestions);
    validateResponses(normalizedAnswers, normalizedQuestions, resolvedMaxVal);

    const scores =
      testType === "big5"
        ? scoreBig5(normalizedAnswers, normalizedQuestions, resolvedMaxVal)
        : scoreMBTI(normalizedAnswers, normalizedQuestions, resolvedMaxVal);

    sendJson({ ok: true, test_type: testType, scores });
  } catch (err) {
    sendJson({ ok: false, error: err?.message ?? String(err) }, 1);
  }
};

main();
