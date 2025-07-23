import React from 'react';

const ArrowUpIcon = ({ size = 36, color = '#43e97b', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <path d="M40 68V20" stroke={color} strokeWidth="8" strokeLinecap="round" />
    <path d="M24 36L40 20L56 36" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default ArrowUpIcon; 