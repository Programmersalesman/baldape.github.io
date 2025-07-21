import React from 'react';
import styles from '../../styles/components/TestimonialsHero.module.css';

function TestimonialsHero({ onOpenModal }) {
  return (
    <div className={`container ${styles.heroContainer}`}>
      <div className={styles.testimonialsHeroBar}>
        {/* Profile Picture */}
        <div className={styles.profilePicture}>
          <img 
            src="/images/profile-pic.png" 
            alt="Profile" 
          />
        </div>

        {/* Content */}
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>
            Testimonials & Reviews
          </h2>
          <div className={styles.heroDescription}>
            Real feedback from communities and clients. Discover what makes our service stand out.
          </div>
          <button
            onClick={onOpenModal}
            className={styles.submitButton}
          >
            Leave a Testimonial
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsHero; 