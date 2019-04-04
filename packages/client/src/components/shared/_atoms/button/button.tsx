import * as React from 'react';
import classnames from 'classnames';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { Icons } from '@components';

const styles = require('./_button.module.scss');

export interface ButtonProps {
  text: string;
  primary?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  to?: string;
  disabled?: boolean;
}

export const ButtonComponent = ({
  text,
  primary = false,
  isLoading = false,
  disabled = false,
  onClick,
  to,
  staticContext,
  ...props
}: ButtonProps & RouteComponentProps) => {
  const classNames = classnames({
    [styles.default]: !primary,
    [styles.primary]: primary,
    [styles.disabled]: props.location.pathname === to,
  });
  if (onClick) {
    return (
      <button className={classNames} {...props}>
        {isLoading ? <Icons.InlineLoader /> : text}
      </button>
    );
  } else {
    return (
      <Link className={classNames} to={to || '/'}>
        {isLoading ? <Icons.InlineLoader /> : text}
      </Link>
    );
  }
};

export default withRouter(ButtonComponent);
