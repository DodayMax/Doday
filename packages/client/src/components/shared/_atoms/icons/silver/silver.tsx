import * as React from 'react';

const vars = require('@styles/_config.scss');

interface SilverProps {
  width?: number;
  height?: number;
  color?: string;
}

export const Silver = ({
  width = 20,
  height = 20,
  color = vars.black,
}: SilverProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(2 2)" fill="none" fillRule="evenodd">
        <circle stroke={color} strokeWidth="1.5" fill="#F7F7F7" cx="10" cy="10" r="10"/>
        <path d="M11.24 16.57a.277.277 0 0 1-.345.061L3.47 12.428a.264.264 0 0 1-.1-.364l2.444-4.15a.275.275 0 0 1 .37-.098L8.809 9.3l2.783-4.723a.275.275 0 0 1 .37-.098l4.57 2.587c.13.073.174.235.1.362l-5.353 9.093a.25.25 0 0 1-.038.049z" fill={color}/>
      </g>
    </svg>
  );
};
