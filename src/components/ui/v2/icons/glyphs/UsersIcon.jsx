import React from 'react';

const UsersIcon = ({ size = 32, color = '#43e97b', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <ellipse cx="28" cy="48" rx="12" ry="8" fill={color} />
    <ellipse cx="52" cy="48" rx="12" ry="8" fill={color} />
    <circle cx="28" cy="36" r="8" fill={color} />
    <circle cx="52" cy="36" r="8" fill={color} />
  </svg>
);

export default UsersIcon; 