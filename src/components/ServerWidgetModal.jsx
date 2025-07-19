import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function ServerWidgetModal({ open, onClose, server }) {
  const [widget, setWidget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedAt, setUpdatedAt] = useState("");
  const [visible, setVisible] = useState(open);
  const [showing, setShowing] = useState(false);

  // Handle mount/unmount and show class for animation
  useEffect(() => {
    if (open) {
      setVisible(true);
      // Add 'show' class on next tick for transition
      setTimeout(() => setShowing(true), 10);
    } else if (visible) {
      setShowing(false);
      // Wait for transition before unmount
      const timeout = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [open, visible]);

  const fetchWidget = () => {
    if (!server) return;
    setLoading(true);
    setError(null);
    fetch(server.widgetUrl)
      .then((res) => res.json())
      .then((data) => {
        setWidget(data);
        setLoading(false);
        setUpdatedAt(
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      })
      .catch(() => {
        setError("Failed to load server info.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (open && server) {
      fetchWidget();
    } else {
      setWidget(null);
      setError(null);
    }
    // eslint-disable-next-line
  }, [open, server]);

  if (!visible || !server) return null;

  // Helper for featured member
  const getFeatured = (members) => {
    if (!members || !members.length) return null;
    return members[Math.floor(Math.random() * members.length)];
  };

  // Helper for fallback icon
  const getIconUrl = (data) => {
    if (data && data.icon && data.id)
      return `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png`;
    return server.image;
  };

  // Modal content
  const modalContent = (
    <div
      className={`server-modal${showing ? " show" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => {
        if (e.target.classList.contains("server-modal")) onClose();
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
          zIndex: 2100,
        }}
        onClick={onClose}
      >
        &times;
      </span>
      <div
        id="server-widget-container"
        className="server-widget-modal-content"
      >
        {loading && (
          <div style={{ textAlign: "center" }}>
            <div className="spinner" style={{ margin: "1.5rem auto" }}></div>
            Loading server information...
          </div>
        )}
        {error && (
          <div style={{ color: "#f04747", marginTop: 20 }}>{error}</div>
        )}
        {!loading && !error && widget && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%" }}>
              <img
                src={getIconUrl(widget)}
                alt={server.name}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  border: "2px solid #5865F2",
                  background: "#2c2f33",
                }}
                onError={(e) => (e.target.src = server.image)}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1.5em", fontWeight: "bold", color: "#a3e3ff" }}>
                  {widget.name || server.name}
                </div>
                <div style={{ fontSize: "1em", color: "#aaa" }}>
                  {widget.presence_count || 0} Members Online
                </div>
              </div>
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
            <div style={{ width: "100%", marginBottom: 8, fontSize: "1.08em", color: "#fff", fontWeight: 600 }}>
              Online Members
            </div>
            <div style={{ width: "100%", maxHeight: 180, overflowY: "auto" }}>
              {widget.members && widget.members.length > 0 ? (
                widget.members.slice(0, 8).map((m) => (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
                    <img src={m.avatar_url} alt={m.username} style={{ width: 32, height: 32, borderRadius: 8 }} />
                    <span style={{ color: "#fff" }}>{m.username}</span>
                    <span style={{ color: m.status === "online" ? "#43b581" : m.status === "idle" ? "#faa61a" : "#f04747", fontSize: "1.2em" }}>●</span>
                  </div>
                ))
              ) : (
                <div style={{ color: "#aaa", fontSize: "0.98em" }}>No online members.</div>
              )}
              {widget.members && widget.members.length > 8 && (
                <div style={{ color: "#aaa", fontSize: "0.95em", marginTop: "0.5rem" }}>...and more</div>
              )}
            </div>
            {/* Featured member */}
            {widget.members && widget.members.length > 0 && (
              (() => {
                const featured = getFeatured(widget.members);
                return (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", margin: "1.2rem 0 0.5rem 0", padding: "0.7rem 1rem", background: "#2c2f33", borderRadius: 10, boxShadow: "0 2px 8px #0002" }}>
                    <img src={featured.avatar_url} alt={featured.username} style={{ width: 40, height: 40, borderRadius: 10 }} />
                    <div>
                      <div style={{ color: "#fff", fontWeight: "bold" }}>{featured.username}</div>
                      <div style={{ color: "#aaa", fontSize: "0.95em" }}>Featured Member</div>
                    </div>
                    <span style={{ color: featured.status === "online" ? "#43b581" : featured.status === "idle" ? "#faa61a" : "#f04747", fontSize: "1.3em", marginLeft: "auto" }}>●</span>
                  </div>
                );
              })()
            )}
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
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.2rem", fontSize: "0.98em", color: "#aaa" }}>
              <span>Last updated: {updatedAt}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.7em" }}>
                <button
                  onClick={() => {
                    if (widget.instant_invite) {
                      navigator.clipboard.writeText(widget.instant_invite);
                    }
                  }}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  title="Copy Invite Link"
                >
                  <svg width="20" height="20" fill="none" stroke="#aaa" strokeWidth="2" viewBox="0 0 20 20"><path d="M7 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1"/><path d="M13 7V6a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1"/><rect x="3" y="7" width="14" height="6" rx="3"/></svg>
                </button>
                <button
                  onClick={fetchWidget}
                  style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "1em", display: "flex", alignItems: "center", gap: "0.3em" }}
                >
                  <svg width="18" height="18" fill="none" stroke="#aaa" strokeWidth="2"><path d="M3 9a6 6 0 1 1 6 6"/><polyline points="9 3 9 9 15 9"/></svg> Refresh
                </button>
              </div>
            </div>
            <div style={{ width: "100%", marginTop: "0.7em", fontSize: "0.93em", color: "#888", textAlign: "center" }}>
              Roles and activity data are not available from the Discord widget API.
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Use React portal to render modal at root
  return createPortal(modalContent, document.body);
}

export default ServerWidgetModal; 