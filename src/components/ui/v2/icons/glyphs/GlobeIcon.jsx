import React from 'react';

const GlobeIcon = ({ size = 56, color = '#38bdf8', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <circle cx="40" cy="40" r="28" stroke={color} strokeWidth="6" fill="none" />
    <ellipse cx="40" cy="40" rx="28" ry="12" stroke={color} strokeWidth="4" fill="none" />
    <ellipse cx="40" cy="40" rx="12" ry="28" stroke={color} strokeWidth="4" fill="none" />
  </svg>
);

export default GlobeIcon; 