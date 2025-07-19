import React from "react";
import styles from "./StatusMessage.module.css";

function StatusMessage({ message, type, onClose }) {
  if (!message) return null;

  const messageClass = `${styles.statusMessage} ${styles[type]}`;

  return (
    <div className={messageClass}>
      <span className={styles.message}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className={styles.closeButton}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default StatusMessage; 