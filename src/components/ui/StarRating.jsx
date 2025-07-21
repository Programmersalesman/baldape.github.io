import React from "react";
import styles from '../../styles/components/StarRating.module.css';

function StarRating({ value, onChange, readOnly }) {
  const containerClass = `${styles.starRating} ${readOnly ? styles.readOnly : styles.interactive}`;
  
  return (
    <div className={containerClass}>
      {[1, 2, 3, 4, 5].map((star) => {
        const starClass = `${styles.star} ${value >= star ? styles.filled : styles.empty} ${!readOnly ? styles.interactive : ''}`;
        
        return (
          <span
            key={star}
            className={starClass}
            onClick={readOnly ? undefined : () => onChange(value === star ? 0 : star)}
            role={readOnly ? undefined : "button"}
            aria-label={readOnly ? undefined : `Rate ${star} star${star > 1 ? 's' : ''}`}
            tabIndex={readOnly ? undefined : 0}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default StarRating; 