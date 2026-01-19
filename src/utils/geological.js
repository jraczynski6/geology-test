export function weightedRandom(items) {
    let totalWeight = 0;
    for (const item of items) totalWeight += item.weight;

    let random = Math.random() * totalWeight;

    for (const item of items) {
        if (random < item.weight) return item.value;
        random -= item.weight;
    }
    return items[0].value; // fallback
}

// Step 1: Generate world size
function generateWorldSize() {
    const sizes = [
        { value: "tiny", weight: 1 },
        { value: "small", weight: 2 },
        { value: "medium", weight: 3 },
        { value: "large", weight: 2 },
        { value: "giant", weight: 1 },
    ];

    return weightedRandom(sizes);
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

export function generateMinerals() {
    const allResources = ["iron", "gold", "copper", "gems", "coal", "stone"];
    const dominantResource = weightedRandom([
        { value: "iron", weight: 5 },
        { value: "gold", weight: 2 },
        { value: "copper", weight: 3 },
        { value: "gems", weight: 1 },
        { value: "coal", weight: 4 },
        { value: "stone", weight: 5 },
    ]);

    const minerals = {};
    allResources.forEach(r => {
        minerals[r] = r === dominantResource ? "dominant" : "average";
    });

    return minerals;
}


export function createGeology(profile) {
    const worldSize = generateWorldSize();
    const tectonics = determineTectonics(worldSize, profile);

    //Derived properties
    const gravityMap = {
        tiny: 0.5,
        small: 0.8,
        medium: 1.0,
        large: 1.2,
        giant: 1.5,
    };
    const mountainDensityMap = {
        dead: "low",
        stable: "moderate",
        active: "high",
    };
    const habitabilityMap = {
        dead: 0.6,
        stable: 0.8,
        active: 0.7,
    };
    // Ocean coverage roughly tied to size
    const oceanMap = {
        tiny: 0.3,
        small: 0.4,
        medium: 0.6,
        large: 0.65,
        giant: 0.7,
    };

     const minerals = generateMinerals();

    return {
        worldSize,
        tectonics,
        gravity: gravityMap[worldSize],
        mountainDensity: mountainDensityMap[tectonics],
        habitability: habitabilityMap[tectonics],
        oceans: oceanMap[worldSize],
        minerals,
    };
}