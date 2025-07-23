import React from "react";
import styles from '../../../styles/components/v2/StepPlan.module.css';

function StepPlan({ steps }) {
  return (
    <section className={styles.stepPlanSection}>
      <h2 className={styles.stepPlanTitle}>How It Works</h2>
      <div className={styles.stepPlanStack}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className={styles.stepCard}>
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepLabel}>{step.label}</div>
              <div className={styles.stepDesc}>{step.desc}</div>
            </div>
            {i < steps.length - 1 && (
              <div className={styles.stepConnector} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default StepPlan; 