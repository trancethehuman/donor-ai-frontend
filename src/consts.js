export const Endpoints = {
  CLASS: import.meta.env.VITE_CLASS_ENDPOINT,
  INDIVIDUAL_DONOR: import.meta.env.VITE_INDIVIDUAL_DONOR_ENDPOINT,
};

export const CreativityLevels = [
  { label: "More Direct", id: 1, value: 0.7 },
  { label: "Normal", id: 2, value: 1 },
  { label: "More Creative", id: 3, value: 1.2 },
];

export const MessageLengths = [
  { label: "Shorter", id: 1, value: "less than 100 words" },
  { label: "Medium", id: 2, value: "from 150 to 300 words" },
  { label: "Longer", id: 3, value: "400 to 600 words" },
];
