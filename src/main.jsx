import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <App />
    </div>
  </React.StrictMode>
); 