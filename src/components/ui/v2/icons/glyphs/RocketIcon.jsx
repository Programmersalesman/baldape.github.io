import React from 'react';

const RocketIcon = ({ size = 36, color = '#F2C94C', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
    <path d="M40 8C56 8 72 40 72 40C72 40 56 72 40 72C24 72 8 40 8 40C8 40 24 8 40 8Z" fill={color} />
    <circle cx="40" cy="40" r="8" fill="#fff" />
  </svg>
);

export default RocketIcon; 