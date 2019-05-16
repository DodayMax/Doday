import * as React from 'react';
import { IconProps } from '../names';

const vars = require('@styles/_config.scss');

interface AppsProps extends IconProps {}

export const Apps = ({
  width = 20,
  height = 20,
  color = vars.black,
}: AppsProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color} fillRule="evenodd">
        <path d="M9.36 2.2h-5.5a1.5 1.5 0 0 0-1.5 1.5v5.5a1.5 1.5 0 0 0 1.5 1.5h5.5a1.5 1.5 0 0 0 1.5-1.5V3.7a1.5 1.5 0 0 0-1.5-1.5zm0 7h-5.5V3.7h5.5v5.5zM20.36 2.2h-5.5a1.5 1.5 0 0 0-1.5 1.5v5.5a1.5 1.5 0 0 0 1.5 1.5h5.5a1.5 1.5 0 0 0 1.5-1.5V3.7a1.5 1.5 0 0 0-1.5-1.5zm0 7h-5.5V3.7h5.5v5.5zM9.36 13.2h-5.5a1.5 1.5 0 0 0-1.5 1.5v5.5a1.5 1.5 0 0 0 1.5 1.5h5.5a1.5 1.5 0 0 0 1.5-1.5v-5.5a1.5 1.5 0 0 0-1.5-1.5zm0 7h-5.5v-5.5h5.5v5.5zM20.36 13.2h-5.5a1.5 1.5 0 0 0-1.5 1.5v5.5a1.5 1.5 0 0 0 1.5 1.5h5.5a1.5 1.5 0 0 0 1.5-1.5v-5.5a1.5 1.5 0 0 0-1.5-1.5zm0 7h-5.5v-5.5h5.5v5.5z" />
      </g>
    </svg>
  );
};
