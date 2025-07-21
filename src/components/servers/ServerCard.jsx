import React from "react";
import styles from '../../styles/components/ServerCard.module.css';

function ServerCard({ server, onClick }) {
  return (
    <div
      className={`server-card dark-glass-card card-clickable ${styles.serverCard}`}
      data-server={server.key}
      onClick={() => onClick(server)}
    >
      <img
        src={server.image}
        alt={server.name + " Server"}
        className={`portfolio-image ${styles.serverImage}`}
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
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            fontWeight: 600,
            fontSize: '1.2em',
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