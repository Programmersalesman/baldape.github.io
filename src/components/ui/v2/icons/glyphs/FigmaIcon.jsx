import React from 'react';

const FigmaIcon = ({ size = 32, ...props }) => (
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
    <circle cx="40" cy="20" r="12" fill="#F24E1E" />
    <circle cx="40" cy="40" r="12" fill="#A259FF" />
    <circle cx="40" cy="60" r="12" fill="#1ABCFE" />
    <circle cx="28" cy="32" r="12" fill="#0ACF83" />
    <circle cx="52" cy="32" r="12" fill="#FF7262" />
  </svg>
);

export default FigmaIcon; 