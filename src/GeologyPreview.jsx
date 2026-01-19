import React, { useState } from "react";
import { createGeology } from "./utils/geological.js";
import { determineSpecies } from "./utils/species.js";
import { generatePlanetName } from "./utils/planetNames.js";

export default function GeologyPreview() {
  const [geology, setGeology] = useState(null);
  const [speciesInfo, setSpeciesInfo] = useState(null);
  const [planetName, setPlanetName] = useState("");
  const [profile, setProfile] = useState("default");

  const generate = () => {
    // Step 1: Generate geology
    const geo = createGeology(profile === "extreme" ? "extreme" : undefined);
    setGeology(geo);

    // Step 2: Determine species based on geology
    const species = determineSpecies(geo);
    setSpeciesInfo(species);

    // Step 3: Generate planet name from dominant species
    const name = generatePlanetName(species.species);
    setPlanetName(name);
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "500px",
      }}
    >
      <h2>Geology Preview</h2>

      {/* Profile selection */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="radio"
            name="profile"
            value="default"
            checked={profile === "default"}
            onChange={() => setProfile("default")}
          />
          Default
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            name="profile"
            value="extreme"
            checked={profile === "extreme"}
            onChange={() => setProfile("extreme")}
          />
          Extreme
        </label>
      </div>

      <button
        onClick={generate}
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Generate
      </button>

      {/* Display results */}
      {geology && speciesInfo && (
        <div style={{ fontSize: "1rem" }}>
          {/* Planet Name and Dominant Species */}
          <div style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            Planet: {planetName} ({speciesInfo.species})
          </div>

          {/* Species ratios */}
          <div style={{ marginBottom: "0.5rem" }}>
            <strong>Species Ratios:</strong>
            <ul style={{ paddingLeft: "1.2rem", marginTop: "0.2rem" }}>
              {Object.entries(speciesInfo.ratios).map(([sp, weight]) => (
                <li
                  key={sp}
                  style={{
                    fontWeight: sp === speciesInfo.species ? "bold" : "normal",
                    color: sp === speciesInfo.species ? "#2e8b57" : "#000",
                  }}
                >
                  {sp}: {weight.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>

          {/* Geology details */}
          <div>
            <div>
              <strong>World Size:</strong> {geology.worldSize}
            </div>
            <div>
              <strong>Tectonics:</strong> {geology.tectonics}
            </div>
            <div>
              <strong>Gravity:</strong> {geology.gravity}
            </div>
            <div>
              <strong>Mountain Density:</strong> {geology.mountainDensity}
            </div>
            <div>
              <strong>Habitability:</strong> {geology.habitability}
            </div>
            <div>
              <strong>Ocean Coverage:</strong> {Math.round(geology.oceans * 100)}%
            </div>

            <div style={{ marginTop: "0.5rem" }}>
              <strong>Minerals:</strong>
              <ul style={{ paddingLeft: "1.2rem", marginTop: "0.2rem" }}>
                {Object.entries(geology.minerals).map(([res, level]) => (
                  <li
                    key={res}
                    style={{
                      fontWeight: level === "dominant" ? "bold" : "normal",
                      color: level === "dominant" ? "#d2691e" : "#000",
                    }}
                  >
                    {res}: {level}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
