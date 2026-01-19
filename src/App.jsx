// App.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import GeologyPreview from "./GeologyPreview";
import { createGeology } from "./utils/geological.js";

function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>WorldGen Sandbox</h1>
      <GeologyPreview createGeology={createGeology} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App
