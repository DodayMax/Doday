import * as React from 'react';
import { IconProps } from '../names';

const vars = require('@styles/_config.scss');

interface CloseCircleProps extends IconProps {}

export const CloseCircle = ({
  width = 20,
  height = 20,
  color = vars.black,
}: CloseCircleProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path fill="none" d="M0 0h24v24H0z" />
        <g fill={color}>
          <path d="M12.108 1.196c-5.94 0-10.756 4.815-10.756 10.755s4.815 10.756 10.756 10.756c5.94 0 10.755-4.816 10.755-10.756S18.048 1.196 12.108 1.196zm0 20.044a9.289 9.289 0 1 1 0-18.578 9.289 9.289 0 0 1 0 18.578z" />
          <path d="M16.038 8a.733.733 0 0 0-1.036 0l-2.782 2.895-3.026-2.933a.733.733 0 1 0-1.017 1.056l3.007 2.894-3.007 2.894a.733.733 0 1 0 1.017 1.056l3.026-2.933 2.782 2.894a.733.733 0 1 0 1.056-1.017l-2.802-2.933 2.802-2.933a.733.733 0 0 0-.02-.94z" />
        </g>
      </g>
    </svg>
  );
};
