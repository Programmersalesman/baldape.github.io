import React from "react";

function StatusMessage({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 3001,
        background: type === 'success' ? "#43b581" : "#f04747",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 8,
        fontWeight: 600,
        fontSize: "1.1em",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        minWidth: "200px",
        maxWidth: "400px",
      }}
    >
      <span style={{ flex: 1 }}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "1.2em",
            cursor: "pointer",
            padding: 0,
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default StatusMessage; 