export const Endpoints = {
  CLASS: import.meta.env.VITE_CLASS_ENDPOINT,
  INDIVIDUAL_DONOR: import.meta.env.VITE_INDIVIDUAL_DONOR_ENDPOINT,
};

export const CreativityLevels = [
  { label: "low", id: 1, value: 0.5 },
  { label: "normal", id: 2, value: 1 },
  { label: "high", id: 3, value: 1.4 },
];
