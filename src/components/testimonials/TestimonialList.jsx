import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import StarRating from "../ui/StarRating";
import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialReactions from "./TestimonialReactions";
import TestimonialShare from "./TestimonialShare";
import { getTestimonialsReactions } from "../../services/supabaseReactionService";
import styles from "./TestimonialList.module.css";
import { getCommunityInfo, communityMapping } from "../../utils/communityMapping";

function TestimonialList({ testimonials, sortBy: externalSortBy, onSortChange, featureFilter: externalFeatureFilter, onFeatureFilterChange }) {
  const [internalSortBy, setInternalSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [communityFilter, setCommunityFilter] = useState('all');
  const [internalFeatureFilter, setInternalFeatureFilter] = useState(null);
  const [reactionsData, setReactionsData] = useState({});
  const [isLoadingReactions, setIsLoadingReactions] = useState(false);
  
  // Infinite scroll state
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10; // Number of testimonials to load per page
  const observerRef = useRef();
  const loadingRef = useRef();
  
  // Share modal state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  
  // Use external sort if provided, otherwise use internal
  const currentSortBy = externalSortBy || internalSortBy;
  const setSortBy = onSortChange || setInternalSortBy;
  
  // Use external feature filter if provided, otherwise use internal
  const currentFeatureFilter = externalFeatureFilter !== undefined ? externalFeatureFilter : internalFeatureFilter;
  const setFeatureFilter = onFeatureFilterChange || setInternalFeatureFilter;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
  }, [currentSortBy, filterBy, communityFilter, currentFeatureFilter]);

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

  // Helper function to get community slug from display name or slug
  const getCommunitySlug = (communityName) => {
    if (!communityName) return null;
    
    // If it's already a valid slug, return it
    if (communityMapping[communityName]) {
      return communityName;
    }
    
    // Try to find by display name
    for (const [slug, info] of Object.entries(communityMapping)) {
      if (info.name === communityName) {
        return slug;
      }
    }
    
    // If still no match, try to normalize
    const normalized = communityName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    // Special cases for the 6 real servers
    const specialCases = {
      'baldapes-lab': 'baldapes-lab',
      'panda-picks': 'panda-picks',
      'cloak-line-bets': 'cloak-line-bets',
      'sportsscijacob': 'sportsscijacob',
      'cantstopthecaptv': 'cantstopthecaptv',
      'betsbyraven': 'betsbyraven'
    };
    
    return specialCases[normalized] || normalized;
  };

  // Load reactions for all testimonials
  useEffect(() => {
    const loadReactions = async () => {
      if (testimonials.length === 0) return;
      
      setIsLoadingReactions(true);
      try {
        const testimonialIds = testimonials.map(t => t.id).filter(Boolean);
        if (testimonialIds.length > 0) {
          const result = await getTestimonialsReactions(testimonialIds);
          if (result.success) {
            setReactionsData(result.counts);
          }
        }
      } catch (error) {
        console.error('Error loading reactions:', error);
      } finally {
        setIsLoadingReactions(false);
      }
    };

    loadReactions();
  }, [testimonials]);

  // Intersection Observer for infinite scroll
  const lastElementRef = useCallback(node => {
    if (isLoadingMore) return;
    
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [isLoadingMore, hasMore]);

  // Handle share button click
  const handleShareClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShareModalOpen(true);
  };

  // Handle share modal close
  const handleShareClose = () => {
    setShareModalOpen(false);
    setSelectedTestimonial(null);
  };

  // Filter and sort testimonials
  const filteredAndSortedTestimonials = useMemo(() => {
    let filtered = [...testimonials];

    // Apply feature filter first
    if (currentFeatureFilter) {
      filtered = filtered.filter(t => {
        const testimonialFeatures = t.features_liked || t.featuresLiked || [];
        return testimonialFeatures.includes(currentFeatureFilter);
      });
    }

    // Apply community filter
    if (communityFilter !== 'all') {
      filtered = filtered.filter(t => {
        const testimonialCommunity = t.community || '';
        const testimonialSlug = getCommunitySlug(testimonialCommunity);
        return testimonialSlug === communityFilter;
      });
    }

    // Apply other filters
    switch (filterBy) {
      case 'recent':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        filtered = filtered.filter(t => new Date(t.created_at || t.date) >= thirtyDaysAgo);
        break;
      case 'featured':
        // Show only testimonials with 5 stars and recent
        const featuredThirtyDaysAgo = new Date();
        featuredThirtyDaysAgo.setDate(featuredThirtyDaysAgo.getDate() - 30);
        filtered = filtered.filter(t => 
          t.rating === 5 && new Date(t.created_at || t.date) >= featuredThirtyDaysAgo
        );
        break;
      case 'anonymous':
        // Show only anonymous reviews
        filtered = filtered.filter(t => 
          t.anonymous === 'anonymous' || t.name === 'Anonymous' || !t.name
        );
        break;
      case 'named':
        // Show only named reviews
        filtered = filtered.filter(t => 
          t.anonymous !== 'anonymous' && t.name !== 'Anonymous' && t.name
        );
        break;
      default:
        // 'all' - no filtering
        break;
    }

    // Apply sorting
    switch (currentSortBy) {
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
      // Handle specific rating sorting (e.g., rating-5, rating-4, etc.)
      default:
        if (currentSortBy.startsWith('rating-')) {
          const targetRating = parseInt(currentSortBy.split('-')[1]);
          console.log(`🎯 Filtering by rating ${targetRating}, found ${filtered.filter(t => t.rating === targetRating).length} testimonials`);
          // Filter to only show testimonials with the target rating
          filtered = filtered.filter(t => t.rating === targetRating);
          // Sort by date (newest first) within the filtered results
          filtered.sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date));
        }
        break;
    }

    return filtered;
  }, [testimonials, currentSortBy, filterBy, communityFilter, currentFeatureFilter]);

  // Paginate testimonials
  const paginatedTestimonials = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    const paginated = filteredAndSortedTestimonials.slice(startIndex, endIndex);
    
    // Update hasMore state
    setHasMore(endIndex < filteredAndSortedTestimonials.length);
    
    return paginated;
  }, [filteredAndSortedTestimonials, currentPage, itemsPerPage]);

  // Simulate loading delay for better UX
  useEffect(() => {
    if (currentPage > 1) {
      setIsLoadingMore(true);
      const timer = setTimeout(() => {
        setIsLoadingMore(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const handleReaction = (testimonialId, reaction, action) => {
    // console.log(`🔄 ${action} reaction ${reaction} for testimonial ${testimonialId}`);
    // Handle reaction updates if needed
  };

  return (
    <>
      {/* Testimonials Header Card */}
      <TestimonialsHeader
        testimonials={filteredAndSortedTestimonials}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
        onCommunityChange={setCommunityFilter}
        currentSort={currentSortBy}
        currentFilter={filterBy}
        currentCommunity={communityFilter}
      />

      {/* Testimonials Scroll Box */}
      <section className={styles.testimonialsScrollBox}>
        {paginatedTestimonials.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>💬</div>
            <div>No testimonials yet. Be the first to share your experience!</div>
          </div>
        ) : (
          <>
            {paginatedTestimonials.map((t, index) => {
              const isLastElement = index === paginatedTestimonials.length - 1;
              
              return (
                <div
                  key={t.id || index}
                  className={styles.testimonialCard}
                  ref={isLastElement ? lastElementRef : null}
                >
                  <div className={styles.testimonialHeader}>
                    <div className={styles.authorInfo}>
                      <StarRating value={t.rating} readOnly />
                      <span className={styles.authorName}>
                        {getDisplayName(t)}
                      </span>
                      <span 
                        className={styles.communityBadge}
                        style={{
                          background: getCommunityInfo(t.community).gradient,
                          borderColor: getCommunityInfo(t.community).borderColor,
                        }}
                      >
                        {getCommunityInfo(t.community).name}
                      </span>
                    </div>
                    <div className={styles.headerActions}>
                      <span className={styles.dateBadge}>
                        {formatDate(t.created_at || t.date)}
                      </span>
                      <button
                        className={styles.shareButton}
                        onClick={() => handleShareClick(t)}
                        title="Share this testimonial"
                      >
                        📤
                      </button>
                    </div>
                  </div>
                  
                  {/* Testimonial Text - Main Content */}
                  <div className={styles.testimonialText}>
                    {t.text || t.message}
                  </div>
                  
                  {/* Features Badge */}
                  {(t.features_liked || t.featuresLiked) && (
                    <div className={styles.featuresSection}>
                      <span className={styles.featuresBadge}>
                        {(t.features_liked || t.featuresLiked).join(", ")}
                      </span>
                    </div>
                  )}
                  
                  {/* Reactions */}
                  <TestimonialReactions 
                    testimonialId={t.id || index}
                    onReaction={(testimonialId, reaction, action) => {
                      // console.log(`🔄 ${action} reaction ${reaction} for testimonial ${testimonialId}`);
                      // Update local state when reaction changes
                      if (action === 'add') {
                        setReactionsData(prev => ({
                          ...prev,
                          [testimonialId]: {
                            ...prev[testimonialId],
                            [reaction]: (prev[testimonialId]?.[reaction] || 0) + 1
                          }
                        }));
                      } else if (action === 'remove') {
                        setReactionsData(prev => ({
                          ...prev,
                          [testimonialId]: {
                            ...prev[testimonialId],
                            [reaction]: Math.max(0, (prev[testimonialId]?.[reaction] || 0) - 1)
                          }
                        }));
                      }
                    }}
                  />
                </div>
              );
            })}
            
            {/* Loading indicator for infinite scroll */}
            {isLoadingMore && (
              <div className={styles.loadingMore} ref={loadingRef}>
                <div className={styles.loadingSpinner}></div>
                <span>Loading more testimonials...</span>
              </div>
            )}
            
            {/* End of results indicator */}
            {!hasMore && paginatedTestimonials.length > 0 && (
              <div className={styles.endOfResults}>
                <span>You've reached the end of all testimonials!</span>
              </div>
            )}
          </>
        )}
      </section>

      {/* Share Modal */}
      {shareModalOpen && selectedTestimonial && (
        <div className={styles.shareModalOverlay} onClick={handleShareClose}>
          <div className={styles.shareModalContent} onClick={(e) => e.stopPropagation()}>
            <TestimonialShare 
              testimonial={selectedTestimonial}
              onClose={handleShareClose}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TestimonialList; 