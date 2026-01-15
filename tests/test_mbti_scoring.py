import json
import unittest
from pathlib import Path

from modules.models import Item
from modules.scoring_bridge import score_mbti_nodejs


class TestMBTIScoring(unittest.TestCase):
    def setUp(self):
        self.questionnaire = [
            Item(text="E1", trait="EI", reverse=False),
            Item(text="I1", trait="EI", reverse=True),
            Item(text="S1", trait="SN", reverse=False),
            Item(text="N1", trait="SN", reverse=True),
            Item(text="T1", trait="TF", reverse=False),
            Item(text="F1", trait="TF", reverse=True),
            Item(text="J1", trait="JP", reverse=False),
            Item(text="P1", trait="JP", reverse=True),
        ]

    def test_all_neutral_leaning_disagree(self):
        responses = [3] * 8
        scores = score_mbti_nodejs(responses, self.questionnaire)
        self.assertEqual(scores["E"], 50)
        self.assertEqual(scores["I"], 50)
        self.assertEqual(scores["S"], 50)
        self.assertEqual(scores["N"], 50)
        self.assertEqual(scores["E"] + scores["I"], 100)
        self.assertEqual(scores["S"] + scores["N"], 100)
        self.assertEqual(scores["T"] + scores["F"], 100)
        self.assertEqual(scores["J"] + scores["P"], 100)
        self.assertEqual(scores["type"], "ESTJ")

    def test_all_first_pole(self):
        responses = [6, 1, 6, 1, 6, 1, 6, 1]
        scores = score_mbti_nodejs(responses, self.questionnaire)
        for key in ("E", "S", "T", "J"):
            self.assertEqual(scores[key], 100)
        for key in ("I", "N", "F", "P"):
            self.assertEqual(scores[key], 0)
        self.assertEqual(scores["type"], "ESTJ")

    def test_all_second_pole(self):
        responses = [1, 6, 1, 6, 1, 6, 1, 6]
        scores = score_mbti_nodejs(responses, self.questionnaire)
        for key in ("E", "S", "T", "J"):
            self.assertEqual(scores[key], 0)
        for key in ("I", "N", "F", "P"):
            self.assertEqual(scores[key], 100)
        self.assertEqual(scores["type"], "INFP")

    def test_mixed_responses(self):
        responses = [5, 2, 2, 5, 6, 6, 1, 1]
        scores = score_mbti_nodejs(responses, self.questionnaire)
        self.assertEqual(scores["E"], 80)
        self.assertEqual(scores["I"], 20)
        self.assertEqual(scores["S"], 20)
        self.assertEqual(scores["N"], 80)
        self.assertEqual(scores["T"], 50)
        self.assertEqual(scores["F"], 50)
        self.assertEqual(scores["J"], 50)
        self.assertEqual(scores["P"], 50)
        self.assertEqual(scores["E"] + scores["I"], 100)
        self.assertEqual(scores["S"] + scores["N"], 100)
        self.assertEqual(scores["T"] + scores["F"], 100)
        self.assertEqual(scores["J"] + scores["P"], 100)
        self.assertEqual(scores["type"], "ENTJ")

    def test_invalid_response_raises(self):
        responses = [0] * 8
        with self.assertRaises(ValueError):
            score_mbti_nodejs(responses, self.questionnaire)

        responses = [7] * 8
        with self.assertRaises(ValueError):
            score_mbti_nodejs(responses, self.questionnaire)

    def test_fixture_reference_scores(self):
        fixtures_path = (
            Path(__file__).resolve().parents[1]
            / "lib"
            / "scoring"
            / "test-fixtures.json"
        )
        with fixtures_path.open("r", encoding="utf-8") as handle:
            fixtures = json.load(handle)

        fixture = fixtures["mbti"]
        questions = [
            Item(
                text=f"Q{idx}",
                trait=question["trait"],
                reverse=question.get("reverse", False),
            )
            for idx, question in enumerate(fixture["questions"], start=1)
        ]
        answers_map = fixture["answers"]
        responses = [
            answers_map.get(str(question["id"]), answers_map.get(question["id"]))
            for question in fixture["questions"]
        ]

        scores = score_mbti_nodejs(responses, questions)
        self.assertEqual(scores, fixture["expected"])


if __name__ == "__main__":
    unittest.main()
