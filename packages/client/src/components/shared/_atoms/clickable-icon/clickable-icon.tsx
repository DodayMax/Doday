import * as React from 'react';
import classnames from 'classnames';

const css = require('./_clickable-icon.module.scss');

interface ClickableIconProps {
  text?: string;
  loading?: boolean;
  onClick: () => void;
  backdrop?: boolean;
  border?: boolean;
  background?: string;
  hover?: boolean;
  // Become rounded rect
  rounded?: boolean;
}

export const ClickableIcon: React.FC<
  ClickableIconProps & React.HTMLAttributes<HTMLElement>
> = ({
  children,
  text,
  onClick,
  className,
  loading = false,
  backdrop = false,
  border = false,
  background,
  hover = false,
  rounded = false,
  ...props
}) => {
  const classNames = classnames({
    [css.iconContainer]: true,
    [css.backdrop]: !!backdrop,
    [css.border]: !!border,
    [css.hover]: !!hover || background,
    [css.rounded]: !!rounded,
    [css.loading]: !!loading,
    [className || '']: true,
  });

  console.log(loading);
  if (loading) {
    return (
      <div className={classNames}>
        {children}
        {text || null}
      </div>
    );
  }

  return (
    <button
      className={classNames}
      style={{ backgroundColor: background || undefined }}
      {...props}
      onClick={onClick}
    >
      {children}
      {text || null}
    </button>
  );
};
