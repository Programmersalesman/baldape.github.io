import React from 'react';

const ShieldIcon = ({ size = 40, color = '#43e97b', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <path d="M40 8L68 20V36C68 56 40 72 40 72C40 72 12 56 12 36V20L40 8Z" fill={color} />
  </svg>
);

export default ShieldIcon; 