import { describe, it, expect } from "vitest";
import { scoreBig5, scoreMBTI } from "./scoring";
import type { Question } from "./types";

describe("Scoring Logic", () => {
  describe("scoreBig5", () => {
    const questions: Question[] = [
      { id: 1, text: "Q1", trait: "Openness", reverse: false },
      { id: 2, text: "Q2", trait: "Openness", reverse: true },
    ];

    it("should score correctly with normal and reverse items", () => {
      const answers = { 1: 5, 2: 1 }; // 5 + (6-1) = 10
      const scores = scoreBig5(answers, questions);
      expect(scores.Openness).toBe(100); // (10 - 2) / (10 - 2) * 100
    });

    it("should handle neutral answers", () => {
      const answers = { 1: 3, 2: 3 }; // 3 + (6-3) = 6
      const scores = scoreBig5(answers, questions);
      expect(scores.Openness).toBe(50); // (6 - 2) / (10 - 2) * 100
    });
  });

  describe("scoreMBTI", () => {
    const questions: Question[] = [
      { id: 1, text: "Q1", trait: "EI", reverse: false },
      { id: 2, text: "Q2", trait: "EI", reverse: true },
    ];

    it("should score EI correctly with 6-point scale", () => {
      const answers = { 1: 6, 2: 1 }; // 6 + (7-1) = 12
      const scores = scoreMBTI(answers, questions);
      expect(scores.E).toBe(100);
      expect(scores.I).toBe(0);
      expect(scores.type).toContain("E");
    });

    it("should handle I preference with 6-point scale", () => {
      const answers = { 1: 1, 2: 6 }; // 1 + (7-6) = 2
      const scores = scoreMBTI(answers, questions);
      expect(scores.E).toBe(0);
      expect(scores.I).toBe(100);
      expect(scores.type).toContain("I");
    });

    it("should handle middle-leaning answers (no neutral)", () => {
      const answers = { 1: 3, 2: 4 }; // 3 + (7-4) = 6
      const scores = scoreMBTI(answers, questions);
      expect(scores.E).toBe(40); // (6 - 2) / (12 - 2) * 100 = 4/10 * 100 = 40
      expect(scores.I).toBe(60);
      expect(scores.type).toContain("I");
    });
  });
});
