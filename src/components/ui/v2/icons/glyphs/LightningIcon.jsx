import React from 'react';

const LightningIcon = ({ size = 40, color = '#FFC700', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <path d="M34 8L12 44H36L30 72L68 32H44L50 8H34Z" fill={color} />
  </svg>
);

export default LightningIcon; 