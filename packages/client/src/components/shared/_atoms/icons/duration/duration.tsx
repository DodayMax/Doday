import * as React from 'react';

const vars = require('@styles/_config.scss');

interface DurationProps {
  width?: number;
  height?: number;
  color?: string;
}

export const Duration = ({
  width = 20,
  height = 20,
  color = vars.black,
}: DurationProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.876 7.511v-4c0-.736-.597-1.333-1.334-1.333H7.653c-.736 0-1.333.597-1.333 1.333v4c0 .379.162.739.444.991l3.836 3.454-3.836 3.453a1.333 1.333 0 0 0-.444.991v4c0 .736.597 1.333 1.333 1.333h8.89c.736 0 1.333-.597 1.333-1.333v-4c-.001-.378-.163-.739-.445-.991l-3.835-3.453 3.835-3.454c.282-.252.444-.612.445-.99zM16.542 20.4H7.653v-.444h8.89v.444zm0-1.778H7.653V16.4l4.027-3.627c.27.094.562.094.831 0l4.031 3.627v2.222zm0-11.11l-4.026 3.626a1.262 1.262 0 0 0-.832 0L7.654 7.51v-4h8.888v4z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};
