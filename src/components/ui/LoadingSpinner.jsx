import React from 'react';
import styles from '../../styles/components/LoadingSpinner.module.css';

function LoadingSpinner({ message = "Loading...", size = "medium" }) {
  return (
    <div className={styles.loadingContainer}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
}

export default LoadingSpinner; 