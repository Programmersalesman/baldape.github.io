import React, { useState, useEffect, useRef } from "react";
import StarRating from "../ui/StarRating";
import styles from "./TestimonialCarousel.module.css";

// Community mapping with proper names and gradients
const communityMapping = {
  "baldapes-lab": {
    name: "BaldApe's Lab",
    gradient: "linear-gradient(90deg, #b91c1c 0%, #ef4444 50%, #f87171 100%)"
  },
  "panda-picks": {
    name: "Panda Picks", 
    gradient: "linear-gradient(90deg, #e5e7eb 0%, #d1d5db 50%, #9ca3af 100%)"
  },
  "cloak-line-bets": {
    name: "Cloak Line Bets",
    gradient: "linear-gradient(90deg, #0ea5e9 0%, #22d3ee 50%, #14b8a6 100%)"
  },
  "sportsscijacob": {
    name: "SportsSciJacob",
    gradient: "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)"
  },
  "cantstopthecaptv": {
    name: "CantStopTheCapTV",
    gradient: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #fde047 100%)"
  },
  "betsbyraven": {
    name: "BetsByRaven",
    gradient: "linear-gradient(90deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)"
  }
};

function TestimonialCarousel({ testimonials }) {
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
    if (!isAutoScrolling || testimonials.length <= 1) return;

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000); // Change every 4 seconds

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, testimonials.length]);

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
    goToSlide((currentIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  if (testimonials.length === 0) {
    return null;
  }

  // Get current testimonial
  const currentTestimonial = testimonials[currentIndex];

  return (
    <div 
      className={styles.carousel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Arrows */}
      {testimonials.length > 1 && (
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
            {(currentTestimonial.text || currentTestimonial.message).length > 150 
              ? `${(currentTestimonial.text || currentTestimonial.message).substring(0, 150)}...`
              : currentTestimonial.text || currentTestimonial.message
            }
          </div>

          {/* Testimonial Footer */}
          <div className={styles.testimonialFooter}>
            <div className={styles.authorInfo}>
              <div className={styles.authorName}>
                {getDisplayName(currentTestimonial)}
              </div>
              {currentTestimonial.community && communityMapping[currentTestimonial.community] && (
                <div 
                  className={styles.authorCommunity}
                  style={{
                    background: communityMapping[currentTestimonial.community].gradient,
                    border: `1px solid ${communityMapping[currentTestimonial.community].gradient.split(',')[0].replace('linear-gradient(90deg, ', '').replace(' 0%', '')}`,
                  }}
                >
                  {communityMapping[currentTestimonial.community].name}
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
      {testimonials.length > 1 && (
        <div className={styles.navDots}>
          {testimonials.map((_, index) => (
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