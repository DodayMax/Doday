import * as React from 'react';
import { IconProps } from '../names';

const vars = require('@styles/_config.scss');

interface ActivityDoTypeProps extends IconProps {}

export const ActivityDoType = ({
  width = 20,
  height = 20,
  color = vars.black,
}: ActivityDoTypeProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color} fillRule="evenodd">
        <path
          fillRule="nonzero"
          d="M10.725 13.472L16.197 8 18 9.803l-7.275 7.274L6 12.352l1.803-1.803z"
        />
        <path d="M17.71 4.749a3.622 3.622 0 0 1 3.612 3.63v7.144a3.622 3.622 0 0 1-3.612 3.63H6.515a3.622 3.622 0 0 1-3.612-3.63V8.379a3.622 3.622 0 0 1 3.612-3.63h11.2-.005zm.005-1.543h-11.2c-2.841.003-5.144 2.317-5.147 5.173v7.144c.006 2.854 2.308 5.166 5.147 5.168h11.2c2.841-.002 5.144-2.317 5.147-5.173V8.374c-.006-2.856-2.31-5.168-5.152-5.168h.005z" />
      </g>
    </svg>
  );
};
