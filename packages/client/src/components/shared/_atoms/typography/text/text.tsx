import * as React from 'react';
import classnames from 'classnames';
import { TypographyProps } from '../index';

const css = require('@styles/_typography.module.scss');

interface TextProps {
  text: string;
}

export const Text: React.SFC<
  TextProps & TypographyProps & React.HTMLAttributes<HTMLElement>
> = ({
  text,
  color,
  align,
  size,
  bold,
  italic,
  uppercase,
  capitalize,
  underline,
  strikethrough,
  ellipsize,
  wordwrap,
  className,
  ...props
}) => {
  const cx = classnames({
    [css['text-l']]: !!!size, // default size for text
    [css['bold']]: !!bold,
    [css['italic']]: !!italic,
    [css['uppercase']]: !!uppercase,
    [css['capitalize']]: !!capitalize,
    [css['underline']]: !!underline,
    [css['strikethrough']]: !!strikethrough,
    [css['ellipsize']]: !!ellipsize,
    [css['wordwrap']]: !!wordwrap,
    [css[`${align}`]]: !!align,
    [css[`text-${size}`]]: !!size,
    [css[`${color}-text`]]: !!color,
    [className]: !!className,
  });

  return (
    <span {...props} className={cx}>
      {text}
    </span>
  );
};
