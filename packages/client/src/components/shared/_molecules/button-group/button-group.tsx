import * as React from 'react';
import classnames from 'classnames';

const css = require('./_button-group.module.scss');

export interface ButtonGroupProps {
  children?: React.ReactNode;
}

export const ButtonGroup = (props: ButtonGroupProps) => {
  const classNames = classnames({
    [css.buttonGroupContainer]: true,
  });

  return <div className={classNames}>{props.children}</div>;
};
