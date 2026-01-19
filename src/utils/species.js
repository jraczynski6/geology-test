import { weightedRandom } from "./geological.js";

// base weights for species
const baseSpeciesWeights = {
  human: 5,
  dwarf: 3,
  elf: 4,
  "beast-folk": 4,
  daemon: 3,
  monsters: 3,
};

// adjust species weights based on geology
function adjustSpeciesWeights(geology) {
  const weights = { ...baseSpeciesWeights };

  // tectonics influence
  if (geology.tectonics === "active") {
    weights.human -= 1;
    weights.elf -= 1;
    weights["beast-folk"] += 1;
    weights.daemon += 1;
    weights.monsters += 1;
  }
  if (geology.tectonics === "dead") {
    weights.dwarf -= 1;
    weights.elf += 1;
  }

  // habitability influence
  if (geology.habitability < 0.5) {
    weights.human -= 2;
    weights.elf -= 1;
    weights["beast-folk"] += 1;
    weights.monsters += 2; // monsters thrive in harsh conditions
  }

  // mineral influence favors dwarves
  const dwarvesFavored = ["iron", "stone", "gems"];
  for (let mineral of dwarvesFavored) {
    if (geology.minerals[mineral] === "dominant") {
      weights.dwarf += 2;
      break;
    }
  }

  // world size influence
  if (geology.worldSize === "giant") weights.monsters += 2;
  if (geology.worldSize === "tiny") {
    weights.human += 1;
    weights.monsters -= 1;
  }

  // clamp negatives
  Object.keys(weights).forEach(k => { if (weights[k] < 0) weights[k] = 0; });

  return weights;
}

// pick dominant species from weights
function pickSpecies(weights) {
  const items = Object.entries(weights).map(([value, weight]) => ({ value, weight }));
  return weightedRandom(items);
}

// convert weights to population percentages with dominant boost
function calculatePopulationRatios(weights, dominant) {
  const boostedWeights = { ...weights };

  // boost dominant species: random factor to reach ~60-80% dominance
  const dominanceFactor = 2 + Math.random() * 1.5; // 1.5–3x
  boostedWeights[dominant] *= dominanceFactor;

  // normalize to percentages
  const total = Object.values(boostedWeights).reduce((sum, w) => sum + w, 0);
  const ratios = {};
  Object.keys(boostedWeights).forEach(sp => {
    ratios[sp] = boostedWeights[sp] / total;
  });

  return ratios;
}

// main exported function
export function determineSpecies(geology) {
  const adjustedWeights = adjustSpeciesWeights(geology);
  const dominantSpecies = pickSpecies(adjustedWeights);
  const ratios = calculatePopulationRatios(adjustedWeights, dominantSpecies);

  return { species: dominantSpecies, ratios };
}
