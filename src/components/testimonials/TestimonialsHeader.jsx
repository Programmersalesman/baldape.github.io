import React from 'react';
import { Dropdown } from '../ui';
import styles from './TestimonialsHeader.module.css';

function TestimonialsHeader({ testimonials, onSortChange, onFilterChange, onCommunityChange, currentSort, currentFilter, currentCommunity }) {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating-high', label: 'Highest Rating' },
    { value: 'rating-low', label: 'Lowest Rating' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Testimonials' },
    { value: 'featured', label: 'Featured' },
    { value: 'recent', label: 'Last 30 Days' },
    { value: 'anonymous', label: 'Anonymous Reviews' },
    { value: 'named', label: 'Named Reviews' }
  ];

  // Real servers only (the 6 actual communities)
  const communityOptions = [
    { value: 'all', label: 'All Communities' },
    { value: 'baldapes-lab', label: "BaldApe's Lab" },
    { value: 'panda-picks', label: 'Panda Picks' },
    { value: 'cloak-line-bets', label: 'Cloak Line Bets' },
    { value: 'sportsscijacob', label: 'SportsSciJacob' },
    { value: 'cantstopthecaptv', label: 'CantStopTheCapTV' },
    { value: 'betsbyraven', label: 'BetsByRaven' }
  ];

  const handleSortChange = (option) => {
    onSortChange(option.value);
  };

  const handleFilterChange = (option) => {
    onFilterChange(option.value);
  };

  const handleCommunityChange = (option) => {
    onCommunityChange(option.value);
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
            <label className={styles.sortLabel}>
              Sort by:
            </label>
            <Dropdown
              options={sortOptions}
              value={currentSort}
              onChange={handleSortChange}
              placeholder="Select sort option"
              id="sort-dropdown"
            />
          </div>

          {/* Community Dropdown */}
          <div className={styles.communityContainer}>
            <label className={styles.communityLabel}>
              Community:
            </label>
            <Dropdown
              options={communityOptions}
              value={currentCommunity}
              onChange={handleCommunityChange}
              placeholder="Select community"
              id="community-dropdown"
            />
          </div>

          {/* Filter Dropdown */}
          <div className={styles.filterContainer}>
            <label className={styles.filterLabel}>
              Filter:
            </label>
            <Dropdown
              options={filterOptions}
              value={currentFilter}
              onChange={handleFilterChange}
              placeholder="Select filter option"
              id="filter-dropdown"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsHeader; 