import React from 'react';

const OnlineIcon = ({ size = 32, color = '#43e97b', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <circle cx="40" cy="40" r="32" fill={color} />
    <polyline points="24,40 36,52 56,28" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default OnlineIcon; 