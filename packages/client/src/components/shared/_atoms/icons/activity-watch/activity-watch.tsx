import * as React from 'react';
import { IconProps } from '../names';

const vars = require('@styles/_config.scss');

interface ActivityWatchTypeProps extends IconProps {}

export const ActivityWatchType = ({
  width = 20,
  height = 20,
  color = vars.black,
}: ActivityWatchTypeProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color} fillRule="evenodd">
        <path d="M17.71 4.749a3.622 3.622 0 0 1 3.612 3.63v7.144a3.622 3.622 0 0 1-3.612 3.63H6.515a3.622 3.622 0 0 1-3.612-3.63V8.379a3.622 3.622 0 0 1 3.612-3.63h11.2-.005zm.005-1.543h-11.2c-2.841.003-5.144 2.317-5.147 5.173v7.144c.006 2.854 2.308 5.166 5.147 5.168h11.2c2.841-.002 5.144-2.317 5.147-5.173V8.374c-.006-2.856-2.31-5.168-5.152-5.168h.005z" />
        <path d="M10.578 9.377l4.093 2.572-4.093 2.571V9.377zm0-1.543c-.848 0-1.535.691-1.535 1.543v5.143c0 .56.304 1.077.792 1.348a1.528 1.528 0 0 0 1.556-.042l4.093-2.571a1.545 1.545 0 0 0 0-2.618l-4.093-2.571a1.53 1.53 0 0 0-.813-.237v.005z" />
      </g>
    </svg>
  );
};
