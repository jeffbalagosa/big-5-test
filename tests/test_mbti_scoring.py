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

    def test_all_neutral(self):
        responses = [3] * 8
        percentages = score_mbti_responses(responses, self.questionnaire)
        for val in percentages.values():
            self.assertEqual(val, 50.0)
        self.assertEqual(
            get_mbti_type(percentages), "ESTJ"
        )  # 50% defaults to first pole

    def test_all_first_pole(self):
        # E, S, T, J
        # E1=5, I1=1 (reverse=True, so 6-1=5) -> 10/10 = 100%
        responses = [5, 1, 5, 1, 5, 1, 5, 1]
        percentages = score_mbti_responses(responses, self.questionnaire)
        for val in percentages.values():
            self.assertEqual(val, 100.0)
        self.assertEqual(get_mbti_type(percentages), "ESTJ")

    def test_all_second_pole(self):
        # I, N, F, P
        # E1=1, I1=5 (reverse=True, so 6-5=1) -> 2/10 = 0%
        responses = [1, 5, 1, 5, 1, 5, 1, 5]
        percentages = score_mbti_responses(responses, self.questionnaire)
        for val in percentages.values():
            self.assertEqual(val, 0.0)
        self.assertEqual(get_mbti_type(percentages), "INFP")

    def test_mixed_responses(self):
        # EI: E1=4, I1=2 (6-2=4) -> 8/10 = 75% (Wait, (8-2)/(10-2) = 6/8 = 75%)
        # SN: S1=2, N1=4 (6-4=2) -> 4/10 = 25%
        # TF: T1=5, F1=5 (6-5=1) -> 6/10 = 50%
        # JP: J1=1, P1=1 (6-1=5) -> 6/10 = 50%
        responses = [4, 2, 2, 4, 5, 5, 1, 1]
        percentages = score_mbti_responses(responses, self.questionnaire)
        self.assertEqual(percentages["EI"], 75.0)
        self.assertEqual(percentages["SN"], 25.0)
        self.assertEqual(percentages["TF"], 50.0)
        self.assertEqual(percentages["JP"], 50.0)
        self.assertEqual(get_mbti_type(percentages), "ENTJ")


if __name__ == "__main__":
    unittest.main()
