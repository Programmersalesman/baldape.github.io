import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { LoadingSpinner } from "../ui";
import styles from '../../styles/components/ServerWidgetModal.module.css';

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
      className={`${styles.serverModal} ${showing ? styles.show : ''}`}
      onClick={(e) => {
        if (e.target.classList.contains(styles.serverModal)) onClose();
      }}
    >
      <span
        className={styles.serverModalClose}
        onClick={onClose}
      >
        &times;
      </span>
      <div className={styles.serverWidgetModalContent}>
        {loading && (
          <LoadingSpinner message="Loading server information..." size="medium" />
        )}
        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}
        {!loading && !error && widget && (
          <>
            <div className={styles.serverHeader}>
              <img
                src={getIconUrl(widget)}
                alt={server.name}
                className={styles.serverIcon}
                onError={(e) => (e.target.src = server.image)}
              />
              <div className={styles.serverInfo}>
                <div className={styles.serverName}>
                  {widget.name || server.name}
                </div>
                <div className={styles.serverMemberCount}>
                  {widget.presence_count || 0} Members Online
                </div>
              </div>
            </div>
            <div className={styles.serverDescription}>
              {server.description}
            </div>
            <div className={styles.membersSection}>
              <div className={styles.membersTitle}>
                Online Members
              </div>
              <div className={styles.membersList}>
                {widget.members && widget.members.length > 0 ? (
                  widget.members.slice(0, 8).map((m) => (
                    <div key={m.id} className={styles.memberItem}>
                      <img src={m.avatar_url} alt={m.username} className={styles.memberAvatar} />
                      <span className={styles.memberName}>{m.username}</span>
                      <span className={`${styles.memberStatus} ${styles[m.status] || styles.offline}`}>●</span>
                    </div>
                  ))
                ) : (
                  <div className={styles.noMembersMessage}>No online members.</div>
                )}
                {widget.members && widget.members.length > 8 && (
                  <div className={styles.moreMembersMessage}>...and more</div>
                )}
              </div>
            </div>
            {/* Featured member */}
            {widget.members && widget.members.length > 0 && (
              (() => {
                const featured = getFeatured(widget.members);
                return (
                  <div className={styles.featuredMember}>
                    <img src={featured.avatar_url} alt={featured.username} className={styles.featuredMemberAvatar} />
                    <div className={styles.featuredMemberInfo}>
                      <div className={styles.featuredMemberName}>{featured.username}</div>
                      <div className={styles.featuredMemberLabel}>Featured Member</div>
                    </div>
                    <span className={`${styles.featuredMemberStatus} ${styles[featured.status] || styles.offline}`}>●</span>
                  </div>
                );
              })()
            )}
            <a
              href={widget.instant_invite || "#"}
              target="_blank"
              rel="noopener"
              className={styles.joinButton}
            >
              Join Server
            </a>
            <div className={styles.footerInfo}>
              <div className={styles.footerLeft}>
                <span>🟢 {widget.presence_count || 0} online</span>
                <span>•</span>
                <span>{widget.members ? widget.members.length : 0} members</span>
              </div>
              <div className={styles.footerRight}>
                <button
                  onClick={fetchWidget}
                  className={styles.refreshButton}
                  title="Refresh data"
                >
                  🔄
                </button>
                <span>•</span>
                <span>Last updated: {updatedAt}</span>
              </div>
            </div>
            <div className={styles.lastUpdated}>
              Data provided by Discord Widget API
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default ServerWidgetModal; 