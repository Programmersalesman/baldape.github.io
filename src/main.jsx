import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { DebugProvider } from './context/DebugContext';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <DebugProvider>
        <div className="rootContainer">
          <App />
        </div>
      </DebugProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
