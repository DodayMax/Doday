import * as React from 'react';
import classnames from 'classnames';

const styles = require('./_double-chevron.module.scss');

interface DoubleChevronIconProps {
  width?: number | string; 
  height?: number | string;
  color?: string;
  className?: string;
  right?: boolean;
  left?: boolean;
}

export const DoubleChevronIcon: React.SFC<DoubleChevronIconProps> = ({
  width,
  height,
  color,
  className,
  right = true,
  left,
}) => {
  const classNames = classnames({
    [styles.icon]: true,
    [className || '']: true,
    [styles.flip]: left,
  });

  return (
    <svg
      width={width || 20}
      height={height || 20}
      className={classNames}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <g fill={color || '#494949'} fillRule="nonzero">
        <path d="M10.362 11.804l-6.124 6.86-1.757-1.968 6.125-6.86L2.48 2.977 4.238 1.01l6.124 6.859.025-.028 1.757 1.968-.025.027.025.028-1.757 1.968-.025-.028z" />
        <path d="M15.932 11.804l-6.124 6.86-1.757-1.968 6.125-6.86L8.05 2.977 9.808 1.01l6.124 6.859.025-.028 1.757 1.968-.025.027.025.028-1.757 1.968-.025-.028z" />
      </g>
    </svg>
  )
};