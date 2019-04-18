import * as React from 'react';

const vars = require('@styles/_config.scss');

interface UnlockedProps {
  width?: number;
  height?: number;
  color?: string;
}

export const Unlocked = ({
  width = 20,
  height = 20,
  color = vars.black,
}: UnlockedProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(6 2)" fill="none" fillRule="evenodd">
      <path d="M8.4 8H10V4a4 4 0 1 0-8 0v1.6h1.6V4a2.4 2.4 0 1 1 4.8 0v4z" fill={color} fillRule="nonzero"/>
      <rect stroke={color} strokeWidth="1.6" fill="#FFF" x="-.8" y="8.2" width="13.6" height="9.6" rx="1"/>
      <circle stroke={color} cx="6" cy="13" r="1.5"/>
      </g>
    </svg>
  );
};
