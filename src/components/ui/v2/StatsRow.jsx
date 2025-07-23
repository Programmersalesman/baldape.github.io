import React from "react";
import styles from '../../../styles/components/v2/StatsRow.module.css';

function StatsRow({ stats }) {
  return (
    <section className={styles.statsRow}>
      {stats.map((s, i) => (
        <div
          key={i}
          className={styles.statsCard}
          style={s.style}
        >
          <span className={styles.statsIcon}>{s.icon}</span>
          <div className={styles.statsValue}>{s.value}</div>
          <div className={styles.statsLabel}>{s.label}</div>
        </div>
      ))}
    </section>
  );
}

export default StatsRow; 