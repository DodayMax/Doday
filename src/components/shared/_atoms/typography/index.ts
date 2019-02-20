import { TypographySize, TypographyColor, TypographyAlignment } from '@lib/common-interfaces';
export * from './text/text';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  size?: TypographySize;
  color?: TypographyColor;
  underline?: boolean;
  strikethrough?: boolean;
  bold?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  capitalize?: boolean;
  ellipsize?: boolean;
  align?: TypographyAlignment;
  wordwrap?: boolean;
}