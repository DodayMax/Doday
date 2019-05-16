import * as React from 'react';
import { IconProps } from '../names';

const vars = require('@styles/_config.scss');

interface LockedProps extends IconProps {}

export const Locked = ({
  width = 20,
  height = 20,
  color = vars.black,
}: LockedProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(6 4)" fill="none" fillRule="evenodd">
        <path
          d="M8.4 8H10V4a4 4 0 1 0-8 0v1.6h1.6V4a2.4 2.4 0 1 1 4.8 0v4z"
          fill={color}
          fillRule="nonzero"
        />
        <rect
          stroke={color}
          strokeWidth="1.6"
          fill="#FFF"
          x="-.8"
          y="6.2"
          width="13.6"
          height="9.6"
          rx="1"
        />
        <circle stroke={color} cx="6" cy="11" r="1.5" />
      </g>
    </svg>
  );
};
