import * as React from 'react';
import classnames from 'classnames';
import { TypographyProps } from '../index';

const styles = require('@styles/_typography.module.scss');

interface TextProps {
  text: string;
}

export const Text: React.SFC<TextProps & TypographyProps & React.HTMLAttributes<HTMLElement>> = ({ text, color, align, size, bold, italic, uppercase, capitalize, underline, strikethrough, ellipsize, wordwrap, className, ...props }) => {
  const classNames = classnames({
    [styles['bold']]: !!bold,
    [styles['italic']]: !!italic,
    [styles['uppercase']]: !!uppercase,
    [styles['capitalize']]: !!capitalize,
    [styles['underline']]: !!underline,
    [styles['strikethrough']]: !!strikethrough,
    [styles['ellipsize']]: !!ellipsize,
    [styles['wordwrap']]: !!wordwrap,
    [styles[`${align}`]]: !!align,
    [styles[`text-${size}`]]: !!size,
    [styles[`${color}-text`]]: !!color,
    [styles['text-l']]: !!!size, // default size for text
    [className || '']: true,
  });

  return (
    <span className={classNames} {...props}>
      {text}
    </span>
  );
};