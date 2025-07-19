import React from "react";
import styles from "./BotCard.module.css";

function BotCard({ bot, isPlaceholder = false, isMystery = false }) {
  if (isPlaceholder) {
    return (
      <div
        className={`bot-card bot-card-placeholder ${styles.placeholder}`}
        tabIndex={-1}
        aria-disabled="true"
      >
        <div className={styles.botIcon}>
          ⏳
        </div>
        <h3>Coming Soon</h3>
        <p>New integration in progress</p>
      </div>
    );
  }

  if (isMystery) {
    return (
      <div className={`bot-card bot-card-mystery ${styles.mystery}`}>
        <div className={styles.mysteryIcon}>
          &#10068;
        </div>
        <h3 className={styles.mysteryTitle}>Your Dream Bot?</h3>
        <p className={styles.mysteryDescription}>
          Looking for something unique? Ask about custom bots or integrations
          tailored to your needs.
        </p>
      </div>
    );
  }

  return (
    <a
      href={bot.href}
      className="bot-card"
      target="_blank"
      rel="noopener"
    >
      <div className="bot-icon">
        <img src={bot.img} alt={bot.alt} className="bot-logo" />
      </div>
      <h3>{bot.name}</h3>
      <p>{bot.desc}</p>
    </a>
  );
}

export default BotCard; 