import * as React from 'react';
import { IconProps } from '../names';

const vars = require('@styles/_config.scss');

interface CloseProps extends IconProps {}

export const Close = ({ width = 20, height = 20, color = vars.black }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M13.045 12.2l6.35-6.475a.75.75 0 0 0-1.07-1.05l-6.34 6.465-6.6-6.475a.75.75 0 1 0-1.05 1.07l6.59 6.465-6.59 6.465a.75.75 0 0 0 1.05 1.07l6.6-6.475 6.34 6.465a.75.75 0 0 0 1.07-1.05l-6.35-6.475z"
          fill={color}
        />
      </g>
    </svg>
  );
};
