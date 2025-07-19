import React from "react";

function ServerCard({ server, onClick }) {
  return (
    <div
      className="server-card dark-glass-card card-clickable"
      data-server={server.key}
      style={{
        cursor: "pointer",
        width: 320,
        maxWidth: "90vw",
        marginBottom: 20,
        transition: "transform 0.2s",
      }}
      onClick={() => onClick(server)}
    >
      <img
        src={server.image}
        alt={server.name + " Server"}
        className="portfolio-image"
        style={{ borderRadius: 12 }}
      />
      <div className="server-overlay-content">
        {server.crown && (
          <span className="crown-icon" title="Flagship Server">
            👑
          </span>
        )}
        <div
          className="server-name"
          style={{
            background: server.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            fontWeight: 600,
            fontSize: "1.2em",
          }}
        >
          {server.name}
        </div>
        <div className="member-count">{server.subtitle}</div>
        <p>{server.description}</p>
      </div>
    </div>
  );
}

export default ServerCard; 