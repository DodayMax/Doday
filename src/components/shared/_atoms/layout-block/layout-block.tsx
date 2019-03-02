import * as React from 'react';
import classnames from 'classnames';
import { AlignTypes, vAlignTypes } from '@lib/common-interfaces';

const styles = require('./_layout-block.module.scss');

interface LayoutBlockProps {
  align?: AlignTypes;
  valign?: vAlignTypes;
  children?: React.ReactNode;
}

export const LayoutBlock = (props: LayoutBlockProps) => {
  const classNames = classnames({
    [styles.layoutBlock]: true,
    [styles[props.align || '']]: !!props.align,
    [styles[props.valign || '']]: !!props.valign,
  });
  return (
    <div className={classNames}>
      {props.children}
    </div>
  )
}