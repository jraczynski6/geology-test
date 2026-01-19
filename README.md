# World Generation: Geology, Species, and Planet Name

## Geology Pass

Generates the planet’s physical traits:

- World Size: tiny → giant
- Tectonics: dead, stable, active
- Gravity: derived from world size
- Mountain Density: based on tectonics
- Habitability: influenced by tectonics
- Ocean Coverage: roughly tied to world size
- Minerals: dominant + average resources

## Species Pass

Determines likely species and population ratios based on geology:

- Species Types: Human, Elf, Dwarf, Beast-Folk, Daemon, Monsters
- Weights are adjusted by tectonics, habitability, minerals, and world size
- Dominant species receives a population boost

## Planet Name Generation

Generates a planet name from the dominant species:

- Uses species-specific prefixes and suffixes
- Weighted selection favors the dominant species

## Workflow

1. Run `createGeology()` to get the planet’s geology.
2. Run `determineSpecies(geology)` to get species info and population ratios.
3. Run `generatePlanetName(species)` to get a planet name based on the dominant species.

This setup allows later passes (prosperity, history, culture) to further adjust populations, dominance, or names.