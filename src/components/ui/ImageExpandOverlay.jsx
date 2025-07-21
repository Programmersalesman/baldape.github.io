import React from 'react';
import styles from '../../styles/components/ImageExpandOverlay.module.css';

function ImageExpandOverlay({ children, onClick, overlayText = 'Expand', overlayIcon = '\u{1F50D}' }) {
  return (
    <div className={styles.imageOverlayContainer} onClick={onClick}>
      {children}
      <div className={styles.imageOverlay}>
        <span className={styles.overlayIcon}>{overlayIcon}</span>
        <span className={styles.overlayText}>{overlayText}</span>
      </div>
    </div>
  );
}

export default ImageExpandOverlay; 