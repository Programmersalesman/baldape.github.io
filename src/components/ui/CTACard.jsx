import React from "react";
import styles from "./CTACard.module.css";

function CTACard({ 
  icon, 
  title, 
  description, 
  onClick, 
  gradient = "linear-gradient(120deg, #a3e3ff 0%, #f0e9ff 100%)",
  shadowColor = "rgba(88, 101, 242, 0.13)"
}) {
  return (
    <div
      className={styles.ctaCard}
      style={{
        background: gradient,
        boxShadow: `0 8px 32px ${shadowColor}, 0 2px 16px #0002`,
      }}
      onClick={onClick}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
}

export default CTACard; 