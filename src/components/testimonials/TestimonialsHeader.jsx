import React, { useState } from 'react';
import styles from './TestimonialsHeader.module.css';

function TestimonialsHeader({ testimonials, onSortChange, onFilterChange, currentSort, currentFilter }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating-high', label: 'Highest Rating' },
    { value: 'rating-low', label: 'Lowest Rating' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Testimonials' },
    { value: '5-star', label: '5 Star Reviews' },
    { value: '4-star', label: '4+ Star Reviews' },
    { value: 'recent', label: 'Last 30 Days' },
    { value: 'community', label: 'Community Specific' }
  ];

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const handleFilterChange = (filterValue) => {
    onFilterChange(filterValue);
    setIsFilterOpen(false);
  };

  return (
    <div className={styles.testimonialsHeader}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>
            Recent Testimonials ({testimonials.length})
          </h3>
          <div className={styles.subtitle}>
            Showing all approved testimonials
          </div>
        </div>
        
        <div className={styles.controlsSection}>
          {/* Sort Dropdown */}
          <div className={styles.sortContainer}>
            <label htmlFor="sort-select" className={styles.sortLabel}>
              Sort by:
            </label>
            <select
              id="sort-select"
              value={currentSort}
              onChange={handleSortChange}
              className={styles.sortSelect}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Dropdown */}
          <div className={styles.filterContainer}>
            <button
              className={styles.filterButton}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span>Filter</span>
              <svg 
                className={`${styles.filterIcon} ${isFilterOpen ? styles.rotated : ''}`}
                width="12" 
                height="12" 
                viewBox="0 0 12 12"
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
            
            {isFilterOpen && (
              <div className={styles.filterDropdown}>
                {filterOptions.map(option => (
                  <button
                    key={option.value}
                    className={`${styles.filterOption} ${currentFilter === option.value ? styles.active : ''}`}
                    onClick={() => handleFilterChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsHeader; 