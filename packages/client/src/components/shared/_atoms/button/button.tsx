import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { Icons } from '@components';
import { DodayColors } from '@root/lib/common-interfaces';
import { detectColor } from '@root/lib/utils';

const vars = require('@styles/_config.scss');
const css = require('./_button.module.scss');

export enum ButtonSize {
  small,
  normal,
  large,
}

export interface ButtonProps {
  text: string;
  active?: boolean;
  activeColor?: DodayColors;
  size?: ButtonSize;
  icon?: React.ReactElement<any>;
  primary?: boolean;
  isLoading?: boolean;
  onClick?: (...args: any) => any;
  type?: string;
  href?: string;
  to?: string;
  disabled?: boolean;
  borderless?: boolean;
  className?: string;
}

export class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    size: ButtonSize.normal,
  };

  render() {
    const {
      primary,
      active,
      activeColor,
      to,
      icon,
      isLoading,
      text,
      type,
      size,
      disabled,
      borderless,
      className,
      ...passthrough
    } = this.props;

    const classNames = classnames(
      {
        [css.default]: !primary,
        [css.primary]: primary,
        [css.disabled]: location.pathname === to || disabled,
        [css.borderless]: borderless,
        [css.withIcon]: !!icon,
      },
      css[ButtonSize[size]],
      className
    );

    const styles = active
      ? {
          backgroundColor: activeColor ? detectColor(activeColor) : vars.gray4,
        }
      : {};

    if (to) {
      return (
        <Link className={classNames} to={to} style={styles}>
          {icon}
          {isLoading ? <Icons.InlineLoader /> : text}
        </Link>
      );
    }
    if (this.props.onClick || (type && type.toLowerCase() === 'submit')) {
      return (
        <button className={classNames} {...passthrough} style={styles}>
          {icon}
          {isLoading ? <Icons.InlineLoader /> : text}
        </button>
      );
    } else {
      return (
        <a className={classNames} {...passthrough} style={styles}>
          {icon}
          {isLoading ? <Icons.InlineLoader /> : text}
        </a>
      );
    }
  }
}
