import React from "react";
import styles from '../../../styles/components/v2/HeroSectionV2.module.css';

/**
 * HeroSectionV2 - v2 design system hero section
 * Props:
 *  - title: string (main heading)
 *  - subtitle: string (subheading)
 *  - ctaButtons: array of { label, onClick, variant }
 *  - imageSrc: string (optional, image below text)
 */
function HeroSectionV2({ title, subtitle, ctaButtons = [], imageSrc }) {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroSubtitle}>{subtitle}</p>
      <div className={styles.ctaRow}>
        {ctaButtons.map((btn, idx) => (
          <button
            key={idx}
            className={btn.variant === 'primary' ? styles.primaryBtn : styles.secondaryBtn}
            onClick={btn.onClick}
          >
            {btn.label}
          </button>
        ))}
      </div>
      {imageSrc && (
        <img src={imageSrc} alt="Hero" className={styles.heroImage} />
      )}
    </section>
  );
}

export default HeroSectionV2; 