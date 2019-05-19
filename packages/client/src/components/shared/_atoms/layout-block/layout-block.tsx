import * as React from 'react';
import classnames from 'classnames';
import {
  AlignTypes,
  vAlignTypes,
  AlignSelf,
  Space,
  spaceAboveClassNames,
  spaceBelowClassNames,
  spaceLeftClassNames,
  spaceRightClassNames,
  paddingAboveClassNames,
  paddingBelowClassNames,
  paddingLeftClassNames,
  paddingRightClassNames,
  SpacingProps,
} from '@lib/common-interfaces';

const css = require('./_layout-block.module.scss');

interface LayoutBlockProps {
  align?: AlignTypes;
  valign?: vAlignTypes;
  alignSelf?: AlignSelf;
  childFlex?: boolean;
  fullHeight?: boolean;
  direction?: 'row' | 'column';
  flex?: string;
  absolute?: boolean;
  relative?: boolean;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  insideElementsMargin?: boolean;
  className?: string;
  styles?: { [key: string]: string };
  children?: React.ReactNode;
}

export const LayoutBlock = (props: LayoutBlockProps & SpacingProps) => {
  const classNames = classnames(
    spaceAboveClassNames[props.spaceAbove!],
    spaceBelowClassNames[props.spaceBelow!],
    spaceLeftClassNames[props.spaceLeft!],
    spaceRightClassNames[props.spaceRight!],
    paddingAboveClassNames[props.paddingAbove!],
    paddingBelowClassNames[props.paddingBelow!],
    paddingLeftClassNames[props.paddingLeft!],
    paddingRightClassNames[props.paddingRight!],
    {
      [css.layoutBlock]: true,
      [css.childFlex]: !!props.childFlex,
      [css[props.align || '']]: !!props.align,
      [css[props.valign || '']]: !!props.valign,
      [css[props.alignSelf || '']]: !!props.alignSelf,
      [css[props.direction || '']]: !!props.direction,
      [css.absolute]: !!props.absolute,
      [css.relative]: !!props.relative,
      [css.insideElementsMargin]: !!props.insideElementsMargin,
      [css.fullHeight]: !!props.fullHeight,
      [props.className]: !!props.className,
    }
  );
  return (
    <div
      className={classNames}
      style={{
        flex: props.flex || 'none',
        top: props.top,
        left: props.left,
        right: props.right,
        bottom: props.bottom,
        ...props.styles,
      }}
    >
      {props.children}
    </div>
  );
};
