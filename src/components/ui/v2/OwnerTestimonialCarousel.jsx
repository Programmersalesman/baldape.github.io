import React, { useState, useEffect, useRef } from "react";
import styles from '../../../styles/components/v2/OwnerTestimonialCarousel.module.css';
import { servers } from '../../../data/servers';

const MAX_TEXT_LENGTH = 120;

function OwnerTestimonialCarousel({ testimonials, onTestimonialClick }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef();

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % testimonials.length);
        setFade(true);
      }, 350);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [paused, testimonials.length]);

  const goTo = i => {
    setFade(false);
    setTimeout(() => {
      setIdx(i);
      setFade(true);
    }, 350);
  };

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className={styles.carouselSection}>
        <h2 className={styles.carouselTitle}>Owner Testimonials</h2>
        <div className={styles.testimonialCard} style={{ minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#888', fontSize: 18 }}>No owner/admin testimonials available yet.</span>
        </div>
      </section>
    );
  }

  const t = testimonials[idx];
  const isLong = t.text && t.text.length > MAX_TEXT_LENGTH;
  const displayText = !isLong ? t.text : t.text.slice(0, MAX_TEXT_LENGTH) + '...';

  // Find the server for this testimonial
  const server = servers.find(s => s.name.toLowerCase() === (t.community || '').toLowerCase());
  const badgeColor = server?.color || '#aaa';
  const badgeLabel = server?.name || t.community || 'Server';
  const inviteUrl = server?.inviteUrl;

  // Determine avatar: use cap.png if community is CantStopTheCapTV and admin review, else use profilePic or avatar
  let avatarSrc = t.profilePic || t.avatar;
  const isCapCommunity = (t.community || '').toLowerCase() === 'cantstopthecaptv';
  const isAdmin = (t.role || '').toLowerCase().includes('admin') || t.isAdminReview;
  if (isCapCommunity && isAdmin) {
    avatarSrc = '/images/cap.png';
  }

  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.carouselTitle}>Owner Testimonials</h2>
      <div
        className={styles.carouselFade}
        style={{ opacity: fade ? 1 : 0 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={styles.testimonialCard}
          tabIndex={0}
          role="button"
          onClick={() => onTestimonialClick && onTestimonialClick(t)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onTestimonialClick && onTestimonialClick(t);
            }
          }}
          style={{ cursor: onTestimonialClick ? 'pointer' : 'default' }}
        >
          <div className={styles.testimonialHeader}>
            <img src={avatarSrc} alt="avatar" className={styles.avatar} />
            <div>
              <div className={styles.author}>{t.author}</div>
              <div className={styles.role}>
                {inviteUrl ? (
                  <a
                    href={inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      background: badgeColor,
                      color: '#fff',
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '2px 10px',
                      marginTop: 2,
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                  >
                    {badgeLabel}
                  </a>
                ) : (
                  <span style={{
                    display: 'inline-block',
                    background: badgeColor,
                    color: '#fff',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '2px 10px',
                    marginTop: 2
                  }}>{badgeLabel}</span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.text}>
            {displayText}
            {isLong && (
              <span
                style={{ color: '#5865f2', cursor: 'pointer', fontWeight: 600, marginLeft: 6 }}
                onClick={e => { e.stopPropagation(); onTestimonialClick && onTestimonialClick(t); }}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onTestimonialClick && onTestimonialClick(t); } }}
                tabIndex={0}
                role="button"
                aria-label="Read more"
              >
                Read more
              </span>
            )}
          </div>
          <div className={styles.stars}>
            {[1,2,3,4,5].map(star => (
              <span key={star} className={star <= t.rating ? styles.starFilled : styles.starEmpty}>★</span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.dotsRow}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={idx === i ? styles.dotActive : styles.dot}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
      <div className={styles.pauseIndicator}>
        {paused ? 'Paused' : 'Auto-rotating (hover to pause)'}
      </div>
    </section>
  );
}

export default OwnerTestimonialCarousel; 