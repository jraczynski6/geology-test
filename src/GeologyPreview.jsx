import React, { useState } from "react";

export default function GeologyPreview({ createGeology }) {
  const [geology, setGeology] = useState(null);
  const [profile, setProfile] = useState("default");

  const generate = () => {
    const result = createGeology(profile === "extreme" ? "extreme" : undefined);
    setGeology(result);
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      <h2>Geology Preview</h2>

      <div>
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
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Generate
      </button>

      {geology && (
        <div style={{ marginTop: "1rem", fontSize: "1rem" }}>
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
      )}
    </div>
  );
}
