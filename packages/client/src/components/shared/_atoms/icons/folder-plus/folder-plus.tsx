import * as React from 'react';
import { IconProps } from '../names';

const vars = require('@styles/_config.scss');

interface FolderPlusProps extends IconProps {}

export const FolderPlus = ({
  width = 20,
  height = 20,
  color = vars.black,
}: FolderPlusProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          d="M11 12V9h2v3h3v2h-3v3h-2v-3H8v-2h3zm10-7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6c1.12 0 1.833.475 2.549 1.379.048.06.261.337.313.402.158.195.19.219.14.219H21zm0 14V7h-9.005c-.719-.004-1.186-.34-1.69-.963-.069-.086-.29-.373-.323-.416C9.607 5.15 9.384 5 9 5H3v14h18z"
          id="folder-1"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="none" d="M0 0h24v24H0z" />
        <mask id="folder-2" fill="#fff">
          <use xlinkHref="#folder-1" />
        </mask>
        <g mask="url(#folder-2)" fill={color}>
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  );
};
