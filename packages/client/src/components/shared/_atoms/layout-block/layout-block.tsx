import * as React from 'react';
import classnames from 'classnames';
import { AlignTypes, vAlignTypes, AlignSelf } from '@lib/common-interfaces';

const styles = require('./_layout-block.module.scss');

interface LayoutBlockProps {
  align?: AlignTypes;
  valign?: vAlignTypes;
  alignSelf?: AlignSelf;
  childFlex?: boolean;
  fullHeight?: boolean;
  direction?: 'row' | 'column';
  flex?: number;
  absolute?: boolean;
  relative?: boolean;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  padding?: string;
  margin?: string;
  insideElementsMargin?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const LayoutBlock = (props: LayoutBlockProps) => {
  const classNames = classnames({
    [styles.layoutBlock]: true,
    [styles.childFlex]: !!props.childFlex,
    [styles[props.align || '']]: !!props.align,
    [styles[props.valign || '']]: !!props.valign,
    [styles[props.alignSelf || '']]: !!props.alignSelf,
    [styles[props.direction || '']]: !!props.direction,
    [styles.absolute]: !!props.absolute,
    [styles.relative]: !!props.relative,
    [styles.insideElementsMargin]: !!props.insideElementsMargin,
    [styles.fullHeight]: !!props.fullHeight,
    [props.className]: !!props.className,
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
