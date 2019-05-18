import * as React from 'react';
import classnames from 'classnames';
import { IconProps } from '../names';

const css = require('./arrow.module.scss');
const vars = require('@styles/_config.scss');

interface ArrowProps extends IconProps {
  left?: boolean;
  right?: boolean;
}

export const Arrow = ({
  left = true,
  right,
  width = 20,
  height = 20,
  color = vars.black,
  hover = false,
}: ArrowProps) => {
  const cx = classnames({
    [css.flip]: right,
    [css.hover]: hover,
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cx}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 12l8-6v12z" fill={color} fillRule="evenodd" />
    </svg>
  );
};
