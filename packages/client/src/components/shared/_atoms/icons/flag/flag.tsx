import * as React from 'react';

const vars = require('@styles/_config.scss');

interface FlagProps {
  width?: number;
  height?: number;
  color?: string;
}

export const Flag = ({
  width = 20,
  height = 20,
  color = vars.black,
}: FlagProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.63 8.9l2.093-3.624a1.404 1.404 0 0 0-.008-1.424c-.261-.439-.74-.71-1.26-.71H5.807a.722.722 0 0 0-.729-.713.722.722 0 0 0-.728.714v18.095c0 .395.326.714.728.714.403 0 .729-.32.729-.714v-6.19h13.6c.504-.001.973-.258 1.238-.678.265-.421.289-.947.064-1.389L18.629 8.9zM5.807 13.619V4.571h13.6l-2.463 4.286 2.429 4.762H5.807z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};
