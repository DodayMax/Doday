import * as React from 'react';
import { IconProps } from '../names';

const vars = require('@styles/_config.scss');

interface ClockProps extends IconProps {}

export const Clock = ({
  width = 20,
  height = 20,
  color = vars.black,
}: ClockProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color} fillRule="evenodd">
        <path d="M12.108 1.196c-5.94 0-10.756 4.815-10.756 10.755s4.815 10.756 10.756 10.756c5.94 0 10.755-4.816 10.755-10.756S18.048 1.196 12.108 1.196zm0 20.044a9.289 9.289 0 1 1 0-18.578 9.289 9.289 0 0 1 0 18.578z" />
        <path d="M16.996 11.462h-4.4V6.084a.733.733 0 1 0-1.466 0v6.845h5.866a.733.733 0 1 0 0-1.467z" />
      </g>
    </svg>
  );
};
