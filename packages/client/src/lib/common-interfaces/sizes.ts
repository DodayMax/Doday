const vars = require('@styles/_config.scss');
const utils = require('@styles/_spaces.module.scss');

export enum TypographySize {
  s = 's',
  m = 'm',
  l = 'l',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
}

export enum Size {
  Small,
  Medium,
  Large,
}

export enum Space {
  None,
  XXSmall, // 4px
  XSmall, // 8px
  Small, // 16px
  Medium, // 20px
  Large, // 32px
  XLarge, // 40px
  XXLarge, // 60px
}

export const spaceValues: { [K in Space]: number } = {
  [Space.None]: 0,
  [Space.XXSmall]: parseInt(vars.spacexxs),
  [Space.XSmall]: parseInt(vars.spacexs),
  [Space.Small]: parseInt(vars.spaces),
  [Space.Medium]: parseInt(vars.spacem),
  [Space.Large]: parseInt(vars.spacel),
  [Space.XLarge]: parseInt(vars.spacexl),
  [Space.XXLarge]: parseInt(vars.spacexxl),
};

// Margins

export const spaceAboveClassNames: { [K in Space]: string } = {
  [Space.None]: utils['space-zero-above'],
  [Space.XXSmall]: utils['space-xxs-above'],
  [Space.XSmall]: utils['space-xs-above'],
  [Space.Small]: utils['space-s-above'],
  [Space.Medium]: utils['space-m-above'],
  [Space.Large]: utils['space-l-above'],
  [Space.XLarge]: utils['space-xl-above'],
  [Space.XXLarge]: utils['space-xxl-above'],
};

export const spaceBelowClassNames: { [K in Space]: string } = {
  [Space.None]: utils['space-zero-below'],
  [Space.XXSmall]: utils['space-xxs-below'],
  [Space.XSmall]: utils['space-xs-below'],
  [Space.Small]: utils['space-s-below'],
  [Space.Medium]: utils['space-m-below'],
  [Space.Large]: utils['space-l-below'],
  [Space.XLarge]: utils['space-xl-below'],
  [Space.XXLarge]: utils['space-xxl-below'],
};

export const spaceLeftClassNames: { [K in Space]: string } = {
  [Space.None]: utils['space-zero-left'],
  [Space.XXSmall]: utils['space-xxs-left'],
  [Space.XSmall]: utils['space-xs-left'],
  [Space.Small]: utils['space-s-left'],
  [Space.Medium]: utils['space-m-left'],
  [Space.Large]: utils['space-l-left'],
  [Space.XLarge]: utils['space-xl-left'],
  [Space.XXLarge]: utils['space-xxl-left'],
};

export const spaceRightClassNames: { [K in Space]: string } = {
  [Space.None]: utils['space-zero-right'],
  [Space.XXSmall]: utils['space-xxs-right'],
  [Space.XSmall]: utils['space-xs-right'],
  [Space.Small]: utils['space-s-right'],
  [Space.Medium]: utils['space-m-right'],
  [Space.Large]: utils['space-l-right'],
  [Space.XLarge]: utils['space-xl-right'],
  [Space.XXLarge]: utils['space-xxl-right'],
};

// Paddings

export const paddingAboveClassNames: { [K in Space]: string } = {
  [Space.None]: utils['padding-zero-above'],
  [Space.XXSmall]: utils['padding-xxs-above'],
  [Space.XSmall]: utils['padding-xs-above'],
  [Space.Small]: utils['padding-s-above'],
  [Space.Medium]: utils['padding-m-above'],
  [Space.Large]: utils['padding-l-above'],
  [Space.XLarge]: utils['padding-xl-above'],
  [Space.XXLarge]: utils['padding-xxl-above'],
};

export const paddingBelowClassNames: { [K in Space]: string } = {
  [Space.None]: utils['padding-zero-below'],
  [Space.XXSmall]: utils['padding-xxs-below'],
  [Space.XSmall]: utils['padding-xs-below'],
  [Space.Small]: utils['padding-s-below'],
  [Space.Medium]: utils['padding-m-below'],
  [Space.Large]: utils['padding-l-below'],
  [Space.XLarge]: utils['padding-xl-below'],
  [Space.XXLarge]: utils['padding-xxl-below'],
};

export const paddingLeftClassNames: { [K in Space]: string } = {
  [Space.None]: utils['padding-zero-left'],
  [Space.XXSmall]: utils['padding-xxs-left'],
  [Space.XSmall]: utils['padding-xs-left'],
  [Space.Small]: utils['padding-s-left'],
  [Space.Medium]: utils['padding-m-left'],
  [Space.Large]: utils['padding-l-left'],
  [Space.XLarge]: utils['padding-xl-left'],
  [Space.XXLarge]: utils['padding-xxl-left'],
};

export const paddingRightClassNames: { [K in Space]: string } = {
  [Space.None]: utils['padding-zero-right'],
  [Space.XXSmall]: utils['padding-xxs-right'],
  [Space.XSmall]: utils['padding-xs-right'],
  [Space.Small]: utils['padding-s-right'],
  [Space.Medium]: utils['padding-m-right'],
  [Space.Large]: utils['padding-l-right'],
  [Space.XLarge]: utils['padding-xl-right'],
  [Space.XXLarge]: utils['padding-xxl-right'],
};
