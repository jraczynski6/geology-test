import React from "react";
import ReactDOM from "react-dom/client";

import GeologyPreview from "./GeologyPreview.jsx";
import { createGeology } from "./utils/geological.js";
import { determineSpecies } from "./utils/species.js";

function App() {
  return (
    <div>
      <h1>World Generator</h1>
      <GeologyPreview
        createGeology={createGeology}
        determineSpecies={determineSpecies} // <-- pass it here
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);


export default App
