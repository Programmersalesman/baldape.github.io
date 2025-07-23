import React from "react";
import styles from '../../../styles/components/v2/FeatureGrid.module.css';

function FeatureGrid({ features, columns }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const gridCols = columns || (isMobile ? 2 : 5);
  return (
    <section
      className={styles.featureGrid}
      style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(160px, 1fr))` }}
    >
      {features.map((f, i) => (
        <div key={i} className={styles.featureCard}>
          <div className={styles.featureIcon}>{f.icon}</div>
          <div className={styles.featureTitle}>{f.title}</div>
          <div className={styles.featureDesc}>{f.longDesc || f.desc}</div>
        </div>
      ))}
    </section>
  );
}

export default FeatureGrid; 