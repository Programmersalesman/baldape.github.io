import React from 'react';

const PhoneIcon = ({ size = 36, color = '#2D9CDB', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <rect x="28" y="16" width="24" height="48" rx="8" fill={color} />
    <rect x="36" y="60" width="8" height="4" rx="2" fill="#fff" />
  </svg>
);

export default PhoneIcon; 