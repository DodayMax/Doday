import * as React from 'react';
import { IconProps } from '../names';

const vars = require('@styles/_config.scss');
const styles = require('./_pie-chart.module.scss');

interface PieChartProps extends IconProps {
  active?: boolean;
}

export const PieChart = ({
  width = 20,
  height = 20,
  active = false,
  color = vars.black,
}: PieChartProps) => {
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
          d="M20.019 3.99C18.343 2.354 16 2.178 15.071 2.178h-.476c-.738.065-1.303.671-1.3 1.395v5.581c0 .771.64 1.396 1.429 1.396h5.714c.79 0 1.429-.625 1.429-1.396 0-.334-.053-3.409-1.848-5.162zm-5.295 5.173V3.58h.347c.767 0 2.643.14 3.939 1.396 1.428 1.395 1.428 4.186 1.428 4.186h-5.714z"
          fill={color}
        />
        <path
          d="M14.724 9.163V3.58h.347c.767 0 2.643.14 3.939 1.396 1.428 1.395 1.428 4.186 1.428 4.186h-5.714z"
          fill={active ? vars.yellowLight : vars.dark}
        />
        <path
          d="M18.533 11.488h-6.19V5.442c0-.77-.64-1.395-1.429-1.395-4.728 0-8.571 3.883-8.571 8.837 0 4.795 3.662 8.837 8.571 8.837 4.968-.068 8.979-3.985 9.048-8.837 0-.77-.64-1.396-1.429-1.396zm-7.619 8.838c-4.128 0-7.143-3.41-7.143-7.442 0-4.033 3.015-7.442 7.143-7.442v7.442h7.62c-.057 4.087-3.435 7.387-7.62 7.442z"
          fill={color}
        />
      </g>
    </svg>
  );
};
