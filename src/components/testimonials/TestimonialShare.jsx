import React, { useState } from "react";
import styles from "./TestimonialShare.module.css";

function TestimonialShare({ testimonial, onClose }) {
  const [copied, setCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState(null);

  const getDisplayName = (testimonial) => {
    if (testimonial.anonymous === 'anonymous' || testimonial.name === 'Anonymous') {
      return 'Anonymous';
    }
    return testimonial.name || testimonial.discord_username || 'Anonymous';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const generateShareText = () => {
    const name = getDisplayName(testimonial);
    const rating = testimonial.rating || 0;
    const stars = '⭐'.repeat(rating);
    const date = formatDate(testimonial.created_at || testimonial.date);
    
    return `"${testimonial.text || testimonial.message}" - ${name} ${stars} (${date})`;
  };

  const generateShareUrl = () => {
    // Create a shareable URL with testimonial ID
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?testimonial=${testimonial.id || 'shared'}`;
  };

  const shareOptions = [
    {
      name: 'Twitter/X',
      icon: '𝕏',
      color: '#000000',
      action: () => {
        const text = generateShareText();
        const url = generateShareUrl();
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: '#1877f2',
      action: () => {
        const url = generateShareUrl();
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      color: '#0077b5',
      action: () => {
        const text = generateShareText();
        const url = generateShareUrl();
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent('Amazing testimonial from BaldApe Services')}&summary=${encodeURIComponent(text)}`;
        window.open(linkedinUrl, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Discord',
      icon: '🎮',
      color: '#5865f2',
      action: () => {
        const text = generateShareText();
        const url = generateShareUrl();
        const discordText = `${text}\n\nRead more: ${url}`;
        navigator.clipboard.writeText(discordText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      name: 'Copy Link',
      icon: '🔗',
      color: '#6c757d',
      action: () => {
        const url = generateShareUrl();
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      name: 'Copy Text',
      icon: '📋',
      color: '#28a745',
      action: () => {
        const text = generateShareText();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  ];

  const handleShare = (option) => {
    setShareMethod(option.name);
    option.action();
  };

  return (
    <div className={styles.shareContainer}>
      <div className={styles.shareHeader}>
        <h3 className={styles.shareTitle}>Share This Testimonial</h3>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>

      <div className={styles.testimonialPreview}>
        <div className={styles.previewText}>
          "{testimonial.text || testimonial.message}"
        </div>
        <div className={styles.previewFooter}>
          <span className={styles.previewAuthor}>
            — {getDisplayName(testimonial)}
          </span>
          <span className={styles.previewRating}>
            {'⭐'.repeat(testimonial.rating || 0)}
          </span>
        </div>
      </div>

      <div className={styles.shareOptions}>
        {shareOptions.map((option) => (
          <button
            key={option.name}
            className={`${styles.shareButton} ${shareMethod === option.name ? styles.active : ''}`}
            onClick={() => handleShare(option)}
            style={{ '--button-color': option.color }}
          >
            <span className={styles.shareIcon}>{option.icon}</span>
            <span className={styles.shareLabel}>{option.name}</span>
          </button>
        ))}
      </div>

      {copied && (
        <div className={styles.copiedMessage}>
          ✓ Copied to clipboard!
        </div>
      )}

      <div className={styles.shareFooter}>
        <p className={styles.shareNote}>
          Share this amazing testimonial and help others discover BaldApe Services!
        </p>
      </div>
    </div>
  );
}

export default TestimonialShare; 