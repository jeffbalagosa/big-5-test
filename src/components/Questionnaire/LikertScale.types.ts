export interface LikertOption {
  label: string;
  value: number;
}

export const FIVE_POINT_SCALE: LikertOption[] = [
  { label: "Strongly Disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly Agree", value: 5 },
];

export const SIX_POINT_SCALE: LikertOption[] = [
  { label: "Strongly Disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Slightly Disagree", value: 3 },
  { label: "Slightly Agree", value: 4 },
  { label: "Agree", value: 5 },
  { label: "Strongly Agree", value: 6 },
];
