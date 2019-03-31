import * as React from 'react';
import classnames from 'classnames';

const styles = require('./_clickable-icon.module.scss');

interface ClickableIconProps {
  text?: string;
  onClick: () => void;
  backdrop?: boolean;
  border?: boolean;
  background?: string;
}

export const ClickableIcon: React.SFC<ClickableIconProps & React.HTMLAttributes<HTMLElement>> = ({ children, text, onClick, className, backdrop = false, border = false, background, ...props }) => {
  const classNames = classnames({
    [styles.iconContainer]: true,
    [styles.backdrop]: !!backdrop,
    [styles.border]: !!border,
    [styles.hover]: !!background,
    [className || '']: true,
  });

  return (
    <button className={classNames} style={{ backgroundColor: background || undefined }} {...props} onClick={onClick}>
      {children}
      {text || null}
    </button>
  );
};