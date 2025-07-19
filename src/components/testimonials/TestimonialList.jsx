import React, { useState, useMemo } from "react";
import StarRating from "../ui/StarRating";
import TestimonialsHeader from "./TestimonialsHeader";
import styles from "./TestimonialCard.module.css";
import listStyles from "./TestimonialList.module.css";

function TestimonialList({ testimonials }) {
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getDisplayName = (testimonial) => {
    if (testimonial.anonymous === 'anonymous' || testimonial.name === 'Anonymous') {
      return 'Anonymous';
    }
    return testimonial.name || testimonial.discord_username || 'Anonymous';
  };

  // Filter and sort testimonials
  const filteredAndSortedTestimonials = useMemo(() => {
    let filtered = [...testimonials];

    // Apply filters
    switch (filterBy) {
      case '5-star':
        filtered = filtered.filter(t => t.rating === 5);
        break;
      case '4-star':
        filtered = filtered.filter(t => t.rating >= 4);
        break;
      case 'recent':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        filtered = filtered.filter(t => new Date(t.created_at || t.date) >= thirtyDaysAgo);
        break;
      case 'community':
        // Filter by community if available
        filtered = filtered.filter(t => t.community && t.community !== '');
        break;
      default:
        // 'all' - no filtering
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at || a.date) - new Date(b.created_at || b.date));
        break;
      case 'rating-high':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'name':
        filtered.sort((a, b) => getDisplayName(a).localeCompare(getDisplayName(b)));
        break;
      default:
        break;
    }

    return filtered;
  }, [testimonials, sortBy, filterBy]);

  return (
    <>
      {/* Testimonials Header Card */}
      <TestimonialsHeader
        testimonials={filteredAndSortedTestimonials}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
        currentSort={sortBy}
        currentFilter={filterBy}
      />

      {/* Testimonials Scroll Box */}
      <section className={listStyles.testimonialsScrollBox}>
        {filteredAndSortedTestimonials.length === 0 ? (
          <div className={listStyles.emptyState}>
            <div className={listStyles.emptyStateIcon}>💬</div>
            <div>No testimonials yet. Be the first to share your experience!</div>
          </div>
        ) : (
          filteredAndSortedTestimonials.map((t, index) => (
            <div
              key={t.id || index}
              className={styles.testimonialCard}
            >
              <div className={listStyles.testimonialHeader}>
                <div className={listStyles.authorInfo}>
                  <StarRating value={t.rating} readOnly />
                  <span className={listStyles.authorName}>
                    {getDisplayName(t)}
                  </span>
                  <span className={listStyles.communityBadge}>
                    {t.community}
                  </span>
                  {(t.features_liked || t.featuresLiked) && (
                    <span className={listStyles.featuresBadge}>
                      {(t.features_liked || t.featuresLiked).join(", ")}
                    </span>
                  )}
                </div>
                <span className={listStyles.dateBadge}>
                  {formatDate(t.created_at || t.date)}
                </span>
              </div>
              <div className={listStyles.testimonialText}>
                "{t.text || t.message}"
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default TestimonialList; 