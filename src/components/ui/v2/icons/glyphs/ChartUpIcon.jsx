import React from 'react';

const ChartUpIcon = ({ size = 40, color = '#2D9CDB', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <path d="M16 64V56L32 40L48 56L68 36" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="68" cy="36" r="4" fill={color} />
  </svg>
);

export default ChartUpIcon; 