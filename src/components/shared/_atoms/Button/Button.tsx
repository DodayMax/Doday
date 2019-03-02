import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { Icons } from '@components';

const styles = require('./_button.module.scss');

interface ButtonProps {
  text: string;
  primary?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  to?: string;
}

export const Button = ({ text, primary = false, isLoading = false, onClick, to, ...props }: ButtonProps) => {
  const classNames = classnames({
    [styles.default]: !primary,
    [styles.primary]: primary
  });
  if (onClick) {
    return (
      <button className={classNames} {...props}>{isLoading ? <Icons.InlineLoader /> : text}</button>
    );
  } else {
    return (
      <Link className={classNames} to={to || '/'}>{isLoading ? <Icons.InlineLoader /> : text}</Link>
    );
  }
}