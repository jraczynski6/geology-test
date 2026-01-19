// src/passes/geological.js

import {
  gravityRanges,
  mountainDensityMap,
  habitabilityBaseMap,
  oceanBaseMap,
  worldSizeOptions,
  allResources,
  dominantResourceWeights,
} from "../utils/geologyData.js";

export function weightedRandom(items) {
  let totalWeight = 0;
  for (const item of items) totalWeight += item.weight;

  let random = Math.random() * totalWeight;

  for (const item of items) {
    if (random < item.weight) return item.value;
    random -= item.weight;
  }

  return items[0].value;
}

// Step 1: Generate world size
function generateWorldSize() {
  return weightedRandom(worldSizeOptions);
}

// Step 2: Generate tectonics based on world size
function determineTectonics(worldSize, profile) {
  let COMMON = 5;
  let UNCOMMON = 3;
  let RARE = 2;

  if (profile === "extreme") {
    COMMON = 3;
    UNCOMMON = 5;
  }

  const options = [
    { value: "dead", weight: RARE },
    { value: "stable", weight: COMMON },
    { value: "active", weight: UNCOMMON },
  ];

  if (worldSize === "tiny" || worldSize === "small") {
    options.forEach(item => {
      if (item.value === "dead") item.weight += 3;
      if (item.value === "active") item.weight -= 1;
    });
  } else if (worldSize === "large" || worldSize === "giant") {
    options.forEach(item => {
      if (item.value === "active") item.weight += 3;
      if (item.value === "dead") item.weight -= 1;
    });
  }

  return weightedRandom(options);
}

// Step 3: Generate minerals with dominant resource
export function generateMinerals() {
  const dominantResource = weightedRandom(dominantResourceWeights);

  const minerals = {};
  allResources.forEach(r => {
    minerals[r] = r === dominantResource ? "dominant" : "average";
  });

  return minerals;
}

// Main geological pass
export function createGeology(profile) {
  const worldSize = generateWorldSize();
  const tectonics = determineTectonics(worldSize, profile);

  // Derived properties
  const gravity = gravityRanges[worldSize][0] + Math.random() * (gravityRanges[worldSize][1] - gravityRanges[worldSize][0]);
  const mountainDensity = mountainDensityMap[tectonics];
  const habitability = habitabilityBaseMap[tectonics];
  const oceans = oceanBaseMap[worldSize];

  const minerals = generateMinerals();

  return {
    worldSize,
    tectonics,
    gravity: +gravity.toFixed(2),
    mountainDensity,
    habitability,
    oceans,
    minerals,
  };
}
