import * as React from 'react';
import { IconProps } from '../names';

const vars = require('@styles/_config.scss');

interface GoalProps extends IconProps {}

export const Goal = ({
  width = 20,
  height = 20,
  color = vars.black,
}: GoalProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(1 1)" fill={color} fillRule="evenodd">
        <path d="M11.108.196C5.168.196.352 5.01.352 10.95s4.815 10.756 10.756 10.756c5.94 0 10.755-4.816 10.755-10.756S17.048.196 11.108.196zm0 20.044a9.289 9.289 0 1 1 0-18.578 9.289 9.289 0 0 1 0 18.578z" />
        <path d="M11.108 3.618a7.333 7.333 0 1 0 0 14.666 7.333 7.333 0 0 0 0-14.666zm0 13.2a5.867 5.867 0 1 1 0-11.734 5.867 5.867 0 0 1 0 11.734z" />
        <path d="M11.108 7.04a3.911 3.911 0 1 0 0 7.822 3.911 3.911 0 0 0 0-7.822zm0 6.356a2.444 2.444 0 1 1 0-4.89 2.444 2.444 0 0 1 0 4.89z" />
        <circle cx="11.108" cy="10.951" r="1" />
      </g>
    </svg>
  );
};
