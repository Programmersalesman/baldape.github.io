import React from 'react';
import styles from '../../styles/components/OrganizationSection.module.css';

function UnifiedCard({ left, right }) {
  return (
    <div className={styles.organizationUnifiedCard}>
      {left}
      {right}
    </div>
  );
}

export default UnifiedCard; 