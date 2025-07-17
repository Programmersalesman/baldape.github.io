import React, { useState } from "react";

const servers = [
  {
    key: "baldapes-lab",
    name: "BaldApe's Lab",
    image: "/images/portfolio/servers/baldapes-lab.jpg",
    gradient: "linear-gradient(90deg, #b91c1c 0%, #ef4444 50%, #f87171 100%)",
    subtitle: "Community Oriented",
    description:
      "Flagship server with premium organization and active community engagement.",
    crown: true,
    widgetUrl: "https://discord.com/api/guilds/1313672266382311505/widget.json",
  },
  {
    key: "panda-picks",
    name: "Panda Picks",
    image: "/images/portfolio/servers/panda-picks.png",
    gradient: "linear-gradient(90deg, #e5e7eb 0%, #d1d5db 50%, #9ca3af 100%)",
    subtitle: "Established Community",
    description:
      "Specialized betting picks with streamlined channel structure.",
    widgetUrl: "https://discord.com/api/guilds/1219446069738471534/widget.json",
  },
  {
    key: "cloak-line-bets",
    name: "Cloak Line Bets",
    image: "/images/portfolio/servers/cloak-line-bets.png",
    gradient: "linear-gradient(90deg, #0ea5e9 0%, #22d3ee 50%, #14b8a6 100%)",
    subtitle: "Sharp Line Movement",
    description:
      "Sharp line movement and value betting community with advanced analytics.",
    widgetUrl: "https://discord.com/api/guilds/1349743443328372767/widget.json",
  },
  {
    key: "sportsscijacob",
    name: "SportsSciJacob",
    image: "/images/portfolio/servers/sports-sci-jacob.png",
    gradient: "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)",
    subtitle: "Researched Plays",
    description:
      "Data-driven sports analysis community with professional setup.",
    widgetUrl: "https://discord.com/api/guilds/1307194482235543574/widget.json",
  },
  {
    key: "cantstopthecaptv",
    name: "CantStopTheCapTV",
    image: "/images/portfolio/servers/cant-stop-the-cap-tv.png",
    gradient: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #fde047 100%)",
    subtitle: "Content Creator Hub",
    description:
      "Streamer community with organized content and engagement channels.",
    widgetUrl: "https://discord.com/api/guilds/1386172082584420382/widget.json",
  },
  {
    key: "betsbyraven",
    name: "BetsByRaven",
    image: "/images/portfolio/servers/bets-by-raven.png",
    gradient: "linear-gradient(90deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)",
    subtitle: "WNBA Plays",
    description: "WNBA-focused betting community with specialized features.",
    widgetUrl: "https://discord.com/api/guilds/1387558595435954187/widget.json",
  },
];

function ServerWidgetModal({ open, onClose, server }) {
  const [widget, setWidget] = useState(null);
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    if (open && server) {
      setLoading(true);
      fetch(server.widgetUrl)
        .then((res) => res.json())
        .then((data) => {
          setWidget(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setWidget(null);
    }
  }, [open, server]);
  if (!open || !server) return null;
  return (
    <div
      className="server-modal"
      style={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        background: "rgba(20,20,30,0.85)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        className="server-modal-close"
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          fontSize: "2.5rem",
          color: "#a3e3ff",
          cursor: "pointer",
          zIndex: 1001,
        }}
        onClick={onClose}
      >
        &times;
      </span>
      <div
        id="server-widget-container"
        style={{
          background: "#23272a",
          padding: "2.2rem 2rem 1.5rem 2rem",
          borderRadius: 18,
          boxShadow: "0 2px 16px #0006",
          width: "100%",
          maxWidth: 420,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#fff",
        }}
      >
        {loading && (
          <div style={{ textAlign: "center" }}>
            <div className="spinner" style={{ margin: "1.5rem auto" }}></div>
            Loading server information...
          </div>
        )}
        {!loading && widget && (
          <>
            <img
              src={server.image}
              alt={server.name}
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                border: "2px solid #5865F2",
                background: "#2c2f33",
                marginBottom: 10,
              }}
            />
            <div
              style={{
                fontSize: "1.5em",
                fontWeight: "bold",
                color: "#a3e3ff",
                marginBottom: 4,
              }}
            >
              {widget.name || server.name}
            </div>
            <div style={{ fontSize: "1em", color: "#aaa", marginBottom: 10 }}>
              {widget.presence_count || 0} Members Online
            </div>
            <div
              style={{
                width: "100%",
                margin: "1.1rem 0 0.7rem 0",
                color: "#b9bbbe",
                fontSize: "1.08em",
              }}
            >
              {server.description}
            </div>
            <a
              href={widget.instant_invite || "#"}
              target="_blank"
              rel="noopener"
              style={{
                display: "block",
                margin: "1.2rem auto 0 auto",
                width: "100%",
                textAlign: "center",
                background: "#5865F2",
                color: "#fff",
                fontWeight: "bold",
                padding: "0.9em 0",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: "1.15em",
                boxShadow: "0 2px 8px #0004",
              }}
            >
              Join Discord
            </a>
          </>
        )}
        {!loading && !widget && (
          <div style={{ color: "#f04747", marginTop: 20 }}>
            Failed to load server info.
          </div>
        )}
      </div>
    </div>
  );
}

function ManagedServersSection() {
  const [modalServer, setModalServer] = useState(null);
  return (
    <section id="servers" className="section">
      <div className="container">
        <h2 className="section-header">My Managed Servers</h2>
        <div className="section-subtitle">
          Explore a selection of Discord communities I professionally manage and
          organize.
          <br />
          <span className="subtitle-note">
            Each server is tailored for engagement, clarity, and growth.
          </span>
        </div>
        <div
          className="server-showcase"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2.5rem",
            justifyContent: "center",
          }}
        >
          {servers.map((server, idx) => (
            <div
              key={server.key}
              className="server-card dark-glass-card card-clickable"
              data-server={server.key}
              style={{
                cursor: "pointer",
                width: 320,
                maxWidth: "90vw",
                marginBottom: 20,
                transition: "transform 0.2s",
              }}
              onClick={() => setModalServer(server)}
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
          ))}
        </div>
        <ServerWidgetModal
          open={!!modalServer}
          onClose={() => setModalServer(null)}
          server={modalServer}
        />
      </div>
    </section>
  );
}

export default ManagedServersSection;
