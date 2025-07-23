import React from 'react';

const ServerIcon = ({ size = 32, color = '#5865f2', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <rect x="16" y="20" width="48" height="16" rx="4" fill={color} />
    <rect x="16" y="44" width="48" height="16" rx="4" fill={color} />
    <circle cx="24" cy="28" r="2" fill="#fff" />
    <circle cx="24" cy="52" r="2" fill="#fff" />
  </svg>
);

export default ServerIcon; 