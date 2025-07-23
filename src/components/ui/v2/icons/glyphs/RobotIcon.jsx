import React from 'react';

const RobotIcon = ({ size = 40, color = '#5865F2', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <rect x="20" y="28" width="40" height="32" rx="8" fill={color} />
    <rect x="32" y="20" width="16" height="8" rx="4" fill={color} />
    <circle cx="28" cy="44" r="4" fill="#fff" />
    <circle cx="52" cy="44" r="4" fill="#fff" />
    <rect x="36" y="52" width="8" height="4" rx="2" fill="#fff" />
  </svg>
);

export default RobotIcon; 