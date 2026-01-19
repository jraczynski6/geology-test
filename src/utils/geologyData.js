export const gravityRanges = {
  tiny: [0.45, 0.55],
  small: [0.75, 0.85],
  medium: [0.95, 1.05],
  large: [1.15, 1.25],
  giant: [1.45, 1.55],
};

export const mountainDensityMap = {
  dead: "low",
  stable: "moderate",
  active: "high",
};

export const habitabilityBaseMap = {
  dead: 0.6,
  stable: 0.8,
  active: 0.7,
};

export const oceanBaseMap = {
  tiny: 0.3,
  small: 0.4,
  medium: 0.6,
  large: 0.65,
  giant: 0.7,
};

export const worldSizeOptions = [
  { value: "tiny", weight: 1 },
  { value: "small", weight: 2 },
  { value: "medium", weight: 3 },
  { value: "large", weight: 2 },
  { value: "giant", weight: 1 },
];

export const allResources = ["iron", "gold", "copper", "gems", "coal", "stone"];

export const dominantResourceWeights = [
  { value: "iron", weight: 5 },
  { value: "gold", weight: 2 },
  { value: "copper", weight: 3 },
  { value: "gems", weight: 1 },
  { value: "coal", weight: 4 },
  { value: "stone", weight: 5 },
];