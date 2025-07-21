import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { DebugProvider } from './context/DebugContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DebugProvider>
      <div className="rootContainer">
        <App />
      </div>
    </DebugProvider>
  </React.StrictMode>
);
