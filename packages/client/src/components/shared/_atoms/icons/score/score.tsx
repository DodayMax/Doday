import * as React from 'react';
import { IconProps } from '../names';

const vars = require('@styles/_config.scss');

interface ScoreProps extends IconProps {}

export const Score = ({
  width = 20,
  height = 20,
  color = vars.black,
}: ScoreProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color} fillRule="evenodd">
        <path fillRule="nonzero" d="M12 4l10 8H2z" />
        <path d="M7 12h10v2H7zM7 15h10v1.6H7zM7 17.6h10v1H7z" />
      </g>
    </svg>
  );
};
