import React from "react";

function BotCard({ bot, isPlaceholder = false, isMystery = false }) {
  if (isPlaceholder) {
    return (
      <div
        className="bot-card bot-card-placeholder"
        tabIndex={-1}
        aria-disabled="true"
        style={{
          cursor: "not-allowed",
          opacity: 0.65,
          pointerEvents: "none",
        }}
      >
        <div
          className="bot-icon"
          style={{
            fontSize: "3rem",
            color: "#a3e3ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "64px",
          }}
        >
          ⏳
        </div>
        <h3>Coming Soon</h3>
        <p>New integration in progress</p>
      </div>
    );
  }

  if (isMystery) {
    return (
      <div
        className="bot-card bot-card-mystery"
        style={{
          margin: "2rem auto 0 auto",
          maxWidth: "600px",
          gridColumn: "1 / span 2",
        }}
      >
        <div
          className="bot-icon"
          style={{
            fontSize: "3.5rem",
            color: "#a3e3ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "64px",
          }}
        >
          &#10068;
        </div>
        <h3 style={{ letterSpacing: "2px" }}>Your Dream Bot?</h3>
        <p style={{ fontStyle: "italic", color: "#fff", opacity: 0.85 }}>
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