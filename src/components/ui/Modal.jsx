import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

function Modal({ open, onClose, children, width = "100%", maxWidth = 1200, maxHeight }) {
  const [visible, setVisible] = useState(open);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => setShowing(true), 10);
    } else if (visible) {
      setShowing(false);
      const timeout = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!visible) return null;

  // Responsive modal sizing
  const modalContent = (
    <div
      className={`${styles.modalOverlay} ${showing ? styles.show : ""}`}
      onClick={(e) => {
        if (e.target.classList.contains(styles.modalOverlay)) onClose();
      }}
    >
      <button
        className={styles.closeButton}
        onClick={onClose}
      >
        &times;
      </button>
      <div
        className={styles.modalContent}
        style={{
          width,
          maxWidth: typeof window !== 'undefined' && window.innerWidth < 700 ? '98vw' : maxWidth,
          maxHeight: maxHeight || (typeof window !== 'undefined' && window.innerWidth < 700 ? '98vh' : '90vh'),
        }}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Modal; 