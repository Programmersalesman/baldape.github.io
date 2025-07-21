import React from "react";
import styles from '../../styles/components/TestimonialAnalytics.module.css';

// Analytics helpers
const getAverageRating = (data) => {
  if (!data.length) return 0;
  return (
    data.reduce((sum, t) => sum + (t.rating || 0), 0) / data.length
  ).toFixed(2);
};

const getRatingDistribution = (data) => {
  const dist = [0, 0, 0, 0, 0];
  data.forEach((t) => {
    if (t.rating >= 1 && t.rating <= 5) dist[t.rating - 1]++;
  });
  return dist;
};

function TestimonialAnalytics({ testimonials, onStarClick, currentSort }) {
  const avgRating = getAverageRating(testimonials);
  const ratingDist = getRatingDistribution(testimonials);
  
  // Additional analytics
  const recentTestimonials = testimonials.filter(t => {
    const date = new Date(t.created_at || t.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return date > thirtyDaysAgo;
  });
  
  const topCommunities = testimonials.reduce((acc, t) => {
    acc[t.community] = (acc[t.community] || 0) + 1;
    return acc;
  }, {});
  const topCommunity = Object.entries(topCommunities).sort((a, b) => b[1] - a[1])[0];

  return (
    <section className={styles.analyticsContainer}>
      {/* Average Rating */}
      <div className={`${styles.analyticsCard} ${styles.averageRatingCard}`}>
        <div className={styles.averageRatingNumber}>{avgRating}</div>
        <div className={styles.averageRatingLabel}>Average Rating</div>
        <div className={styles.averageRatingStars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`${styles.clickableStar} ${
                star <= Math.round(avgRating) ? styles.filledStar : styles.emptyStar
              } ${currentSort === `rating-${star}` ? styles.activeStar : ''}`}
              onClick={() => onStarClick && onStarClick(star)}
              title={`Click to filter by ${star} star reviews`}
            >
              ★
            </span>
          ))}
        </div>

      </div>
      
      {/* Total Reviews */}
      <div className={`${styles.analyticsCard} ${styles.totalReviewsCard}`}>
        <div className={styles.totalReviewsNumber}>{testimonials.length}</div>
        <div className={styles.totalReviewsLabel}>Total Reviews</div>
        <div className={styles.totalReviewsSubtext}>
          {recentTestimonials.length} in last 30 days
        </div>
      </div>
      
      {/* Top Community */}
      <div className={`${styles.analyticsCard} ${styles.topCommunityCard}`}>
        <div className={styles.topCommunityNumber}>
          {topCommunity ? topCommunity[1] : 0}
        </div>
        <div className={styles.topCommunityLabel}>Top Community</div>
        <div className={styles.topCommunityName}>
          {topCommunity ? topCommunity[0] : 'None'}
        </div>
      </div>
      
      {/* Rating Distribution */}
      <div className={`${styles.analyticsCard} ${styles.ratingDistributionCard}`}>
        <div className={styles.ratingDistributionTitle}>
          Rating Distribution
          {currentSort && currentSort.startsWith('rating-') && (
            <button
              className={styles.clearFilterButton}
              onClick={() => onStarClick && onStarClick(null)}
              title="Clear star filter"
            >
              Clear Filter
            </button>
          )}
        </div>
        <div className={styles.ratingDistributionList}>
          {ratingDist.map((count, i) => {
            const starRating = i + 1;
            return (
              <div 
                key={i} 
                className={`${styles.ratingDistributionItem} ${
                  currentSort === `rating-${starRating}` ? styles.activeRatingItem : ''
                }`}
                onClick={() => onStarClick && onStarClick(starRating)}
                title={`Click to filter by ${starRating} star reviews`}
              >
                <span className={styles.ratingLabel}>{starRating}★</span>
                <div className={styles.ratingBarContainer}>
                  <div 
                    className={styles.ratingBar}
                    style={{ width: `${(count / testimonials.length) * 100 || 2}%` }}
                  />
                </div>
                <span className={styles.ratingCount}>{count}</span>
              </div>
            );
          }).reverse()}
        </div>
      </div>
    </section>
  );
}

export default TestimonialAnalytics; 