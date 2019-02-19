import * as React from 'react';
import classnames from 'classnames';

const styles = require('./_clickable-icon.module.scss');

interface ClickableIconProps {
  onClick: () => void;
}

export const ClickableIcon: React.SFC<ClickableIconProps & React.HTMLAttributes<HTMLElement>> = ({ children, onClick, className, ...props }) => {
  const classNames = classnames({
    [styles.iconContainer]: true,
    [className || '']: true,
  });

  return (
    <button className={classNames} {...props} onClick={onClick}>
      {children}
    </button>
  );
};