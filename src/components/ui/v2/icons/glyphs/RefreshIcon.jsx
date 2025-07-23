import React from 'react';

const RefreshIcon = ({ size = 20, color = '#5865f2', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <path d="M40 16a24 24 0 1 1-17 7" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M40 8v16h16" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default RefreshIcon; 