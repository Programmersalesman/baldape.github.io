import React, { useState } from "react";
import Dropdown from "./Dropdown";
import styles from '../../styles/components/DropdownExample.module.css';

function DropdownExample() {
  const [sortValue, setSortValue] = useState("newest");
  const [filterValue, setFilterValue] = useState("all");

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "rating-high", label: "Highest Rating" },
    { value: "rating-low", label: "Lowest Rating" },
    { value: "name", label: "Name A-Z" }
  ];

  const filterOptions = [
    { value: "all", label: "All Testimonials" },
    { value: "5-star", label: "5 Star Reviews" },
    { value: "4-star", label: "4+ Star Reviews" },
    { value: "recent", label: "Last 30 Days" },
    { value: "community", label: "Community Specific" }
  ];

  return (
    <div className={styles.exampleContainer}>
      <h3>Universal Dropdown Example</h3>
      
      <div className={styles.controlsRow}>
        <div className={styles.controlGroup}>
          <label className={styles.label}>Sort by:</label>
          <Dropdown
            options={sortOptions}
            value={sortValue}
            onChange={(option) => setSortValue(option.value)}
            placeholder="Select sort option"
            id="sort-dropdown"
          />
        </div>
        
        <div className={styles.controlGroup}>
          <label className={styles.label}>Filter:</label>
          <Dropdown
            options={filterOptions}
            value={filterValue}
            onChange={(option) => setFilterValue(option.value)}
            placeholder="Select filter option"
            id="filter-dropdown"
          />
        </div>
      </div>

      <div className={styles.selectedValues}>
        <p><strong>Selected Sort:</strong> {sortValue}</p>
        <p><strong>Selected Filter:</strong> {filterValue}</p>
      </div>
    </div>
  );
}

export default DropdownExample; 