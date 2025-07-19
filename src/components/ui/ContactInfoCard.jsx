import React from "react";
import styles from "./ContactInfoCard.module.css";

function ContactInfoCard({ icon, title, value, link }) {
  const cardContent = (
    <div className={`frosted-card ${styles.card}`}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>{value}</div>
    </div>
  );

  if (link) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.link}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

export default ContactInfoCard; 