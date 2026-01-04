import unittest
from modules.models import Item
from modules.scoring import score_mbti_responses, get_mbti_type


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
        # In 6-point scale, 3 is Slightly Disagree, 4 is Slightly Agree
        # E1=3, I1=3 (reverse=True, so 7-3=4) -> 7/12. (7-2)/(12-2) = 50%
        responses = [3] * 8
        percentages = score_mbti_responses(responses, self.questionnaire)
        for val in percentages.values():
            self.assertEqual(val, 50.0)
        self.assertEqual(
            get_mbti_type(percentages), "ESTJ"
        )  # 50% defaults to first pole

    def test_all_first_pole(self):
        # E, S, T, J
        # E1=6, I1=1 (reverse=True, so 7-1=6) -> 12/12. (12-2)/(12-2) = 100%
        responses = [6, 1, 6, 1, 6, 1, 6, 1]
        percentages = score_mbti_responses(responses, self.questionnaire)
        for val in percentages.values():
            self.assertEqual(val, 100.0)
        self.assertEqual(get_mbti_type(percentages), "ESTJ")

    def test_all_second_pole(self):
        # I, N, F, P
        # E1=1, I1=6 (reverse=True, so 7-6=1) -> 2/12. (2-2)/(12-2) = 0%
        responses = [1, 6, 1, 6, 1, 6, 1, 6]
        percentages = score_mbti_responses(responses, self.questionnaire)
        for val in percentages.values():
            self.assertEqual(val, 0.0)
        self.assertEqual(get_mbti_type(percentages), "INFP")

    def test_mixed_responses(self):
        # EI: E1=5, I1=2 (7-2=5) -> 10/12. (10-2)/(12-2) = 80%
        # SN: S1=2, N1=5 (7-5=2) -> 4/12. (4-2)/(12-2) = 20%
        # TF: T1=6, F1=6 (7-6=1) -> 7/12. (7-2)/(12-2) = 50%
        # JP: J1=1, P1=1 (7-1=6) -> 7/12. (7-2)/(12-2) = 50%
        responses = [5, 2, 2, 5, 6, 6, 1, 1]
        percentages = score_mbti_responses(responses, self.questionnaire)
        self.assertEqual(percentages["EI"], 80.0)
        self.assertEqual(percentages["SN"], 20.0)
        self.assertEqual(percentages["TF"], 50.0)
        self.assertEqual(percentages["JP"], 50.0)
        self.assertEqual(get_mbti_type(percentages), "ENTJ")


if __name__ == "__main__":
    unittest.main()
