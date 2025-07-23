import React from 'react';

const PaletteIcon = ({ size = 40, color = '#FFB347', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <path d="M40 12C23 12 12 27 12 40c0 13 11 20 20 20 2 0 4-2 4-4 0-2-2-4-4-4-4 0-8-4-8-8 0-8 8-16 16-16s16 8 16 16c0 4-4 8-8 8-2 0-4 2-4 4 0 2 2 4 4 4 9 0 20-7 20-20C68 27 57 12 40 12z" fill={color}/>
    <circle cx="28" cy="36" r="3" fill="#fff" />
    <circle cx="40" cy="28" r="3" fill="#fff" />
    <circle cx="52" cy="36" r="3" fill="#fff" />
    <circle cx="32" cy="48" r="3" fill="#fff" />
  </svg>
);

export default PaletteIcon; 