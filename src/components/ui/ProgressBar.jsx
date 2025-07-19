import React from 'react';
import styles from './ProgressBar.module.css';

function ProgressBar({ progress, label = "Form Progress", showPercentage = true }) {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressHeader}>
        <span className={styles.progressLabel}>{label}</span>
        {showPercentage && (
          <span className={styles.progressPercentage}>{progress}% Complete</span>
        )}
      </div>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar; 