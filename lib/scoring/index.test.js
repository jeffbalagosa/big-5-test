import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  scoreLikertItem,
  isValidLikertResponse,
  scoreBig5,
  scoreMBTI,
} from "./index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesPath = path.join(__dirname, "test-fixtures.json");
const fixtures = JSON.parse(fs.readFileSync(fixturesPath, "utf8"));

test("scoreLikertItem handles reverse scoring", () => {
  assert.equal(scoreLikertItem(5, false, 5), 5);
  assert.equal(scoreLikertItem(1, true, 5), 5);
  assert.equal(scoreLikertItem(5, true, 5), 1);
});

test("scoreLikertItem rejects out-of-range", () => {
  assert.throws(() => scoreLikertItem(0, false, 5));
  assert.throws(() => scoreLikertItem(7, true, 6));
});

test("isValidLikertResponse identifies valid integers", () => {
  assert.equal(isValidLikertResponse(1, 5), true);
  assert.equal(isValidLikertResponse(5, 5), true);
  assert.equal(isValidLikertResponse(0, 5), false);
  assert.equal(isValidLikertResponse(6, 5), false);
  assert.equal(isValidLikertResponse(3.5, 5), false);
});

test("scoreBig5 matches fixture expectations", () => {
  const { answers, questions, expected } = fixtures.big5;
  const scores = scoreBig5(answers, questions);
  assert.deepEqual(scores, expected);
});

test("scoreBig5 tolerates missing or invalid responses", () => {
  const questions = fixtures.big5.questions;
  const scores = scoreBig5({ 1: 5, 2: 0 }, questions); // second answer invalid -> ignored
  assert.equal(scores.Openness, 100);
  assert.equal(scores.Conscientiousness, 50);
});

test("scoreBig5 throws on invalid scale", () => {
  assert.throws(() => scoreBig5({}, fixtures.big5.questions, 1));
});

test("scoreMBTI matches fixture expectations", () => {
  const { answers, questions, expected } = fixtures.mbti;
  const scores = scoreMBTI(answers, questions);
  assert.deepEqual(scores, expected);
});

test("scoreMBTI defaults to 50 when no responses", () => {
  const scores = scoreMBTI({}, fixtures.mbti.questions);
  assert.equal(scores.E, 50);
  assert.equal(scores.I, 50);
  assert.equal(scores.type, "ESTJ");
});

test("scoreMBTI keeps dichotomy totals at 100", () => {
  const { answers, questions } = fixtures.mbti;
  const scores = scoreMBTI(answers, questions);
  assert.equal(scores.E + scores.I, 100);
  assert.equal(scores.S + scores.N, 100);
  assert.equal(scores.T + scores.F, 100);
  assert.equal(scores.J + scores.P, 100);
});

test("scoreMBTI rejects bad scale", () => {
  assert.throws(() => scoreMBTI({}, fixtures.mbti.questions, 1));
});
