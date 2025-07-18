import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
      className={`server-modal${showing ? " show" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        background: "rgba(20,20,30,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        padding: 0,
      }}
      onClick={(e) => {
        if (e.target.classList.contains("server-modal")) onClose();
      }}
    >
      <span
        className="server-modal-close"
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          fontSize: "2.5rem",
          color: "#a3e3ff",
          cursor: "pointer",
          zIndex: 2100,
        }}
        onClick={onClose}
      >
        &times;
      </span>
      <div
        style={{
          background: "#23272a",
          padding: "2.2rem 2rem 1.5rem 2rem",
          borderRadius: 24,
          boxShadow: "0 8px 48px 0 rgba(31,38,135,0.22)",
          width,
          maxWidth: typeof window !== 'undefined' && window.innerWidth < 700 ? '98vw' : maxWidth,
          maxHeight: maxHeight || (typeof window !== 'undefined' && window.innerWidth < 700 ? '98vh' : '90vh'),
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#fff",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Modal; 