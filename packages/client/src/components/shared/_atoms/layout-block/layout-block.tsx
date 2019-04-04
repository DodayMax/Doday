import * as React from 'react';
import classnames from 'classnames';
import { AlignTypes, vAlignTypes } from '@lib/common-interfaces';

const styles = require('./_layout-block.module.scss');

interface LayoutBlockProps {
  align?: AlignTypes;
  valign?: vAlignTypes;
  direction?: 'row' | 'column';
  flex?: number;
  absolute?: boolean;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  padding?: string;
  margin?: string;
  children?: React.ReactNode;
}

export const LayoutBlock = (props: LayoutBlockProps) => {
  const classNames = classnames({
    [styles.layoutBlock]: true,
    [styles[props.align || '']]: !!props.align,
    [styles[props.valign || '']]: !!props.valign,
    [styles[props.direction || '']]: !!props.direction,
    [styles.absolute]: !!props.absolute,
  });
  return (
    <div
      className={classNames}
      style={{
        flex: props.flex || 1,
        padding: props.padding,
        margin: props.margin,
        top: props.top,
        left: props.left,
        right: props.right,
        bottom: props.bottom,
      }}
    >
      {props.children}
    </div>
  );
};
