import React, { useState, useEffect, useRef } from "react";
import StarRating from "../ui/StarRating";
import RoleBadge from "../ui/RoleBadge";
import styles from '../../styles/components/TestimonialCarousel.module.css';
import mysteryStyles from "../../styles/components/mystery-effects.module.css";
import { getCommunityInfo } from "../../utils/communityMapping";

function TestimonialCarousel({ testimonials, highlightedTestimonialId, highlightStyle = 'mystery' }) {
  // Select testimonials for the carousel, prioritizing the highlighted one
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollRef = useRef(null);

  // Update featured testimonials when testimonials or highlightedTestimonialId changes
  useEffect(() => {
    console.log('🔄 Carousel updating with highlightedTestimonialId:', highlightedTestimonialId);
    console.log('📊 Available testimonials:', testimonials.map(t => ({ id: t.id, type: typeof t.id })));
    
    if (testimonials.length <= 3) {
      setFeaturedTestimonials(testimonials);
      return;
    }
    
    // If there's a highlighted testimonial, put it first
    if (highlightedTestimonialId) {
      // Try multiple ways to find the testimonial
      let highlightedTestimonial = testimonials.find(t => t.id === highlightedTestimonialId);
      if (!highlightedTestimonial) {
        highlightedTestimonial = testimonials.find(t => t.id?.toString() === highlightedTestimonialId);
      }
      if (!highlightedTestimonial) {
        highlightedTestimonial = testimonials.find(t => t.id?.toString() === highlightedTestimonialId?.toString());
      }
      
      console.log('🎯 Found highlighted testimonial:', highlightedTestimonial);
      console.log('🔍 Search details:', {
        highlightedTestimonialId,
        highlightedTestimonialIdType: typeof highlightedTestimonialId,
        found: !!highlightedTestimonial
      });
      
      if (highlightedTestimonial) {
        const otherTestimonials = testimonials.filter(t => t.id !== highlightedTestimonial.id);
        const shuffledOthers = otherTestimonials.sort(() => 0.5 - Math.random()).slice(0, 2);
        const newFeatured = [highlightedTestimonial, ...shuffledOthers];
        console.log('📋 Setting featured testimonials:', newFeatured.map(t => t.id));
        setFeaturedTestimonials(newFeatured);
        setCurrentIndex(0); // Reset to first position
        return;
      } else {
        console.log('❌ Could not find highlighted testimonial with ID:', highlightedTestimonialId);
      }
    }
    
    // Fallback to random selection
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    setFeaturedTestimonials(shuffled.slice(0, 3));
  }, [testimonials, highlightedTestimonialId]);

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
    }, highlightedTestimonialId && currentIndex === 0 ? 8000 : 4000); // Longer delay for highlighted testimonial

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, featuredTestimonials.length, highlightedTestimonialId, currentIndex]);

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
          className={`${styles.testimonialCard} ${
            highlightedTestimonialId && (
              currentTestimonial.id === highlightedTestimonialId ||
              currentTestimonial.id?.toString() === highlightedTestimonialId ||
              currentTestimonial.id?.toString() === highlightedTestimonialId?.toString()
            )
              ? mysteryStyles[`testimonialHighlight${highlightStyle.charAt(0).toUpperCase() + highlightStyle.slice(1)}`]
              : ''
          }`}
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
              <div className={styles.authorBadges}>
                {currentTestimonial.role && (
                  <RoleBadge role={currentTestimonial.role} size="small" />
                )}
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