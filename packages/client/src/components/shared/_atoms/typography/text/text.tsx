import * as React from 'react';
import classnames from 'classnames';
import { TypographyProps } from '../index';
import {
  spaceAboveClassNames,
  paddingAboveClassNames,
  spaceBelowClassNames,
  spaceLeftClassNames,
  spaceRightClassNames,
  paddingBelowClassNames,
  paddingLeftClassNames,
  paddingRightClassNames,
  SpacingProps,
} from '@root/lib/common-interfaces';

const css = require('@styles/_typography.module.scss');

interface TextProps {}

export const Text: React.SFC<
  TextProps & TypographyProps & SpacingProps & React.HTMLAttributes<HTMLElement>
> = ({
  color,
  align,
  size,
  bold,
  heavy,
  italic,
  uppercase,
  capitalize,
  underline,
  strikethrough,
  ellipsize,
  wordwrap,
  fullWidth,
  spaceAbove,
  spaceBelow,
  spaceLeft,
  spaceRight,
  paddingAbove,
  paddingBelow,
  paddingLeft,
  paddingRight,
  className,
  ...props
}) => {
  const cx = classnames(
    spaceAboveClassNames[spaceAbove!],
    spaceBelowClassNames[spaceBelow!],
    spaceLeftClassNames[spaceLeft!],
    spaceRightClassNames[spaceRight!],
    paddingAboveClassNames[paddingAbove!],
    paddingBelowClassNames[paddingBelow!],
    paddingLeftClassNames[paddingLeft!],
    paddingRightClassNames[paddingRight!],
    {
      [css['text-l']]: !!!size, // default size for text
      [css['bold']]: !!bold,
      [css['heavy']]: !!heavy,
      [css['italic']]: !!italic,
      [css['uppercase']]: !!uppercase,
      [css['capitalize']]: !!capitalize,
      [css['underline']]: !!underline,
      [css['strikethrough']]: !!strikethrough,
      [css['ellipsize']]: !!ellipsize,
      [css['wordwrap']]: wordwrap,
      [css[`${align}`]]: !!align,
      [css[`text-${size}`]]: !!size,
      [css[`${color}-text`]]: !!color,
      [css['fullwidth']]: !!fullWidth,
      [className]: !!className,
    }
  );

  return (
    <span {...props} className={cx}>
      {props.children}
    </span>
  );
};
