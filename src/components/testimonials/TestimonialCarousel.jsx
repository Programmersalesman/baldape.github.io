import React, { useState, useEffect, useRef } from "react";
import StarRating from "../ui/StarRating";
import styles from "./TestimonialCarousel.module.css";
import { getCommunityInfo } from "../../utils/communityMapping";

function TestimonialCarousel({ testimonials }) {
  // Select 3 random testimonials for the carousel
  const [featuredTestimonials] = useState(() => {
    if (testimonials.length <= 3) return testimonials;
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollRef = useRef(null);

  // Get display name helper
  const getDisplayName = (testimonial) => {
    if (testimonial.anonymous === 'anonymous' || testimonial.name === 'Anonymous') {
      return 'Anonymous';
    }
    return testimonial.name || testimonial.discord_username || 'Anonymous';
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || featuredTestimonials.length <= 1) return;

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredTestimonials.length);
    }, 4000); // Change every 4 seconds

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, featuredTestimonials.length]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoScrolling(false);
    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % featuredTestimonials.length);
  };

  const prevSlide = () => {
    goToSlide(currentIndex === 0 ? featuredTestimonials.length - 1 : currentIndex - 1);
  };

  if (featuredTestimonials.length === 0) {
    return null;
  }

  // Get current testimonial
  const currentTestimonial = featuredTestimonials[currentIndex];

  return (
    <div 
      className={styles.carousel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Arrows */}
      {featuredTestimonials.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className={`${styles.navButton} ${styles.prev}`}
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className={`${styles.navButton} ${styles.next}`}
          >
            ›
          </button>
        </>
      )}

      {/* Testimonial Container */}
      <div className={styles.testimonialContainer}>
        <div
          key={currentTestimonial.id || currentIndex}
          className={styles.testimonialCard}
        >
          {/* Testimonial Text */}
          <div className={styles.testimonialText}>
            {currentTestimonial.text || currentTestimonial.message}
          </div>

          {/* Testimonial Footer */}
          <div className={styles.testimonialFooter}>
            <div className={styles.authorInfo}>
              <div className={styles.authorName}>
                {getDisplayName(currentTestimonial)}
              </div>
              {currentTestimonial.community && (
                <div 
                  className={styles.authorCommunity}
                  style={{
                    '--community-gradient': getCommunityInfo(currentTestimonial.community).gradient,
                    '--community-border': `1px solid ${getCommunityInfo(currentTestimonial.community).color}`,
                    background: getCommunityInfo(currentTestimonial.community).gradient,
                    border: `1px solid ${getCommunityInfo(currentTestimonial.community).color}`,
                    color: 'white',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {getCommunityInfo(currentTestimonial.community).name}
                </div>
              )}
            </div>
            

            
            <div className={styles.ratingDisplay}>
              <div className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${styles.star} ${star <= (currentTestimonial.rating || 0) ? styles.filled : styles.empty}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className={styles.ratingText}>
                {currentTestimonial.rating || 0}/5
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      {featuredTestimonials.length > 1 && (
        <div className={styles.navDots}>
          {featuredTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.navDot} ${index === currentIndex ? styles.active : ''}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TestimonialCarousel; 