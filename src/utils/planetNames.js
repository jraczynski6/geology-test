import { planetPrefixes, planetSuffixes } from "./planetNameData.js";
import { weightedRandom } from "./geological.js"; // reuse your existing function

export function generatePlanetName(dominantSpecies) {
  // filter by dominant species
  const prefixes = planetPrefixes.filter(p => p.type.toLowerCase() === dominantSpecies.toLowerCase());
  const suffixes = planetSuffixes.filter(s => s.type.toLowerCase() === dominantSpecies.toLowerCase());

  const prefix = weightedRandom(prefixes);
  const suffix = weightedRandom(suffixes);

  return prefix + suffix;
}