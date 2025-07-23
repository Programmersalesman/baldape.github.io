import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { LoadingSpinner } from "../ui";
import styles from '../../styles/components/ServerWidgetModal.module.css';
import { RefreshIcon } from '../ui/v2/icons/glyphs';

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

  // Utility to shuffle an array
  function shuffle(array) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

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
                  🟢 {widget.presence_count || 0} Members Online
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
              {(() => {
                const randomMembers = widget.members ? shuffle([...widget.members]) : [];
                return (
                  <div className={styles.membersList}>
                    {randomMembers.slice(0, 8).map((m) => (
                      <div key={m.id} className={styles.memberItem}>
                        <img src={m.avatar_url} alt={m.username} className={styles.memberAvatar} />
                        <span className={styles.memberName} title={m.username}>{m.username}</span>
                        <span className={`${styles.memberStatus} ${styles[m.status] || styles.offline}`}>●</span>
                      </div>
                    ))}
                    {randomMembers.length === 0 && (
                      <div className={styles.noMembersMessage}>No online members.</div>
                    )}
                    {randomMembers.length > 8 && (
                      <div className={styles.moreMembersMessage}>...and more</div>
                    )}
                  </div>
                );
              })()}
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
                {/* Online/member count only shown in header now */}
              </div>
              <div className={styles.footerRight} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, width: '100%' }}>
                <button
                  onClick={fetchWidget}
                  className={styles.refreshButton}
                  title="Refresh data"
                  style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <RefreshIcon size={20} />
                  <span style={{ fontWeight: 500, fontSize: 14, color: '#5865f2' }}>Refresh</span>
                </button>
                <span style={{ color: '#888', fontSize: 13 }}>
                  Last updated: <span style={{ fontWeight: 600 }}>{updatedAt}</span>
                </span>
              </div>
            </div>
            <div className={styles.lastUpdated}>
              <span style={{
                color: '#5865f2',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: 0.2,
                display: 'block',
                textAlign: 'center',
                width: '100%'
              }}>
                Discord Widget API
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default ServerWidgetModal;