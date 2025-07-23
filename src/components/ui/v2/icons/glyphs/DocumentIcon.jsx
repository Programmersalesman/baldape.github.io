import React from 'react';

const DocumentIcon = ({ size = 36, color = '#5865F2', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <rect x="20" y="16" width="40" height="48" rx="6" fill={color} />
    <rect x="28" y="28" width="24" height="4" rx="2" fill="#fff" />
    <rect x="28" y="40" width="24" height="4" rx="2" fill="#fff" />
  </svg>
);

export default DocumentIcon; 