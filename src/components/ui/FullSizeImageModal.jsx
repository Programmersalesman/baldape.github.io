import React from "react";
import Modal from "./Modal";
import styles from "../../styles/components/Modal.module.css";

function FullSizeImageModal({ open, onClose, src, alt, caption }) {
  return (
    <Modal open={open} onClose={onClose} width="auto" maxWidth={900} maxHeight={"90vh"}>
      <div style={{ textAlign: "center", padding: 0 }}>
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: "90vw",
            maxHeight: "70vh",
            borderRadius: 16,
            boxShadow: "0 4px 32px #00000033",
            marginBottom: caption ? 16 : 0,
          }}
        />
        {caption && (
          <div style={{ marginTop: 8, color: "#444", fontSize: 16 }}>{caption}</div>
        )}
      </div>
    </Modal>
  );
}

export default FullSizeImageModal; 