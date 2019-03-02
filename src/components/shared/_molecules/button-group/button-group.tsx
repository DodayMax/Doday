import * as React from 'react';
import classnames from 'classnames';

const styles = require('./_button-group.module.scss');

export interface ButtonGroupProps {
  children?: React.ReactNode;
}

export const ButtonGroup = (props: ButtonGroupProps) => {
  const classNames = classnames({
    [styles.buttonGroupContainer]: true
  });
  
  return (
    <div className={classNames}>
      {props.children}
    </div>
  );
};