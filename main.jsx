import React from "react";
import { createRoot } from "react-dom/client";
// Compatibility entry point for older Slate deployments.
// The maintained application now lives in /src.
import App from "./src/App.jsx";
import "./src/styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
