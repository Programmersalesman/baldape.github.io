import React from "react";

function StarRating({ value, onChange, readOnly }) {
  return (
    <div className="star-rating" style={{ fontSize: '1.3em', display: 'flex', flexDirection: 'row', gap: '0.15em', cursor: readOnly ? 'default' : 'pointer', marginBottom: 0 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ color: value >= star ? '#ffd700' : '#444', transition: 'color 0.2s' }}
          onClick={readOnly ? undefined : () => onChange(value === star ? 0 : star)}
          role={readOnly ? undefined : "button"}
          aria-label={readOnly ? undefined : `Rate ${star} star${star > 1 ? 's' : ''}`}
          tabIndex={readOnly ? undefined : 0}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating; 