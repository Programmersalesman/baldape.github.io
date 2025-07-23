import React from 'react';

const PaintBrushIcon = ({ size = 40, color = '#FF7262', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <rect x="36" y="12" width="8" height="40" rx="4" fill={color} />
    <ellipse cx="40" cy="64" rx="12" ry="8" fill={color} />
  </svg>
);

export default PaintBrushIcon; 