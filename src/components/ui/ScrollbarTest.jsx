import React from 'react';
import styles from './Scrollbar.module.css';

const ScrollbarTest = () => {
  return (
    <div className={styles.customScrollbar} style={{ height: '200px', overflow: 'auto', padding: '20px' }}>
      <h3>Scrollbar Test Component</h3>
      <p>This component tests the custom scrollbar styling.</p>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i}>
          Test paragraph {i + 1} - This is to create enough content to make the container scrollable.
        </p>
      ))}
    </div>
  );
};

export default ScrollbarTest; 