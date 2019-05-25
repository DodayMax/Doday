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
import { utils } from '@styles/utils';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

const css = (theme: Theme) =>
  createStyles({
    layoutBlock: {
      display: 'flex',
    },
    ...utils,
  });

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

export const LayoutBlock = withStyles(css)(
  (props: LayoutBlockProps & SpacingProps & WithStyles) => {
    const classNames = classnames(
      props.classes[spaceAboveClassNames[props.spaceAbove!]],
      props.classes[spaceBelowClassNames[props.spaceBelow!]],
      props.classes[spaceLeftClassNames[props.spaceLeft!]],
      props.classes[spaceRightClassNames[props.spaceRight!]],
      props.classes[paddingAboveClassNames[props.paddingAbove!]],
      props.classes[paddingBelowClassNames[props.paddingBelow!]],
      props.classes[paddingLeftClassNames[props.paddingLeft!]],
      props.classes[paddingRightClassNames[props.paddingRight!]],
      {
        [props.classes.layoutBlock]: true,
        [props.classes.childFlex]: !!props.childFlex,
        [props.classes[props.align || '']]: !!props.align,
        [props.classes[props.valign || '']]: !!props.valign,
        [props.classes[props.alignSelf || '']]: !!props.alignSelf,
        [props.classes[props.direction || '']]: !!props.direction,
        [props.classes.absolute]: !!props.absolute,
        [props.classes.relative]: !!props.relative,
        [props.classes.insideElementsMargin]: !!props.insideElementsMargin,
        [props.classes.fullHeight]: !!props.fullHeight,
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
  }
);
