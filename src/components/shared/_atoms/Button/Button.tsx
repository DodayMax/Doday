import * as React from 'react';
import classnames from 'classnames';

import { Icons } from '@components'; 

const styles = require('./_button.module.scss');

interface ButtonProps {
  text: string;
  primary?: boolean;
  isLoading?: boolean;
  onClick: () => void;
}

export const Button = ({ text, primary = false, isLoading = false, ...props }: ButtonProps) => {
  const classNames = classnames({
    [styles.default]: !primary,
    [styles.primary]: primary
  });
  return (
    <button className={classNames} {...props}>{isLoading ? <Icons.InlineLoader /> : text}</button>
  );
}