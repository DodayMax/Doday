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

export const DoubleChevronIcon: React.FC<DoubleChevronIconProps> = ({
  width,
  height,
  color,
  className,
  left = true,
  right,
}) => {
  const classNames = classnames({
    [styles.icon]: true,
    [className || '']: true,
    [styles.flip]: right,
  });

  return (
    <svg
      width={width || 20}
      height={height || 20}
      className={classNames}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color || '#494949'}
        fillRule="evenodd"
        d="M9.991 20C15.504 20 20 15.521 20 9.991S15.521 0 9.991 0 0 4.479 0 9.991C0 15.504 4.479 20 9.991 20zm0-18.605c4.738 0 8.596 3.86 8.596 8.596 0 4.738-3.858 8.596-8.596 8.596-4.737 0-8.596-3.858-8.596-8.596 0-4.737 3.86-8.596 8.596-8.596zm.948 13.592a.69.69 0 0 0 .5.207.707.707 0 0 0 .5-1.206L7.888 9.94l4.049-4.049a.707.707 0 0 0-1-.999L6.392 9.44a.69.69 0 0 0-.207.5c0 .19.07.361.207.5l4.548 4.547z"
      />
    </svg>
  );
};
