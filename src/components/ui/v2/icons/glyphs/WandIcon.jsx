import React from 'react';

const WandIcon = ({ size = 56, color = '#f59e42', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <rect x="36" y="16" width="8" height="40" rx="4" fill={color} transform="rotate(45 40 36)" />
    <circle cx="40" cy="16" r="4" fill={color} />
    <circle cx="40" cy="64" r="3" fill={color} />
    <circle cx="56" cy="40" r="3" fill={color} />
    <circle cx="24" cy="40" r="2.5" fill={color} />
  </svg>
);

export default WandIcon; 