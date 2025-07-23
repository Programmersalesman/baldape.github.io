import React from 'react';

const CalendarIcon = ({ size = 48, color = '#2D9CDB', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <rect x="16" y="24" width="48" height="40" rx="4" fill={color} />
    <rect x="16" y="32" width="48" height="32" rx="2" fill="#fff" />
    <rect x="24" y="40" width="8" height="8" rx="2" fill={color} />
    <rect x="36" y="40" width="8" height="8" rx="2" fill={color} />
    <rect x="48" y="40" width="8" height="8" rx="2" fill={color} />
  </svg>
);

export default CalendarIcon; 