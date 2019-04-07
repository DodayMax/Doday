import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { Icons } from '@components';

const styles = require('./_button.module.scss');

export enum ButtonSize {
  small,
  normal,
  large,
}

export interface ButtonProps {
  text: string;
  size?: ButtonSize;
  primary?: boolean;
  isLoading?: boolean;
  onClick?: (...args: any) => any;
  type?: string;
  href?: string;
  to?: string;
  disabled?: boolean;
}

export class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    size: ButtonSize.normal,
  };

  render() {
    const {
      primary,
      to,
      isLoading,
      text,
      type,
      size,
      ...passthrough
    } = this.props;

    const classNames = classnames(
      {
        [styles.default]: !primary,
        [styles.primary]: primary,
        [styles.disabled]: location.pathname === to,
      },
      styles[ButtonSize[size]]
    );

    if (to) {
      return (
        <Link className={classNames} to={to}>
          {isLoading ? <Icons.InlineLoader /> : text}
        </Link>
      );
    }
    if (this.props.onClick || (type && type.toLowerCase() === 'submit')) {
      return (
        <button className={classNames} {...passthrough}>
          {isLoading ? <Icons.InlineLoader /> : text}
        </button>
      );
    } else {
      return (
        <a className={classNames} {...passthrough}>
          {isLoading ? <Icons.InlineLoader /> : text}
        </a>
      );
    }
  }
}
