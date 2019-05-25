export enum TypographySize {
  xxs = 'xxs',
  xs = 'xs',
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

// Margins

export const spaceAboveClassNames: { [K in Space]: string } = {
  [Space.None]: 'marginZeroAbove',
  [Space.XXSmall]: 'marginXXSAbove',
  [Space.XSmall]: 'marginXSAbove',
  [Space.Small]: 'marginSAbove',
  [Space.Medium]: 'marginMAbove',
  [Space.Large]: 'marginLAbove',
  [Space.XLarge]: 'marginXLAbove',
  [Space.XXLarge]: 'marginXXLAbove',
};

export const spaceBelowClassNames: { [K in Space]: string } = {
  [Space.None]: 'marginZeroBelow',
  [Space.XXSmall]: 'marginXXSBelow',
  [Space.XSmall]: 'marginXSBelow',
  [Space.Small]: 'marginSBelow',
  [Space.Medium]: 'marginMBelow',
  [Space.Large]: 'marginLBelow',
  [Space.XLarge]: 'marginXLBelow',
  [Space.XXLarge]: 'marginXXLBelow',
};

export const spaceLeftClassNames: { [K in Space]: string } = {
  [Space.None]: 'marginZeroLeft',
  [Space.XXSmall]: 'marginXXSLeft',
  [Space.XSmall]: 'marginXSLeft',
  [Space.Small]: 'marginSLeft',
  [Space.Medium]: 'marginMLeft',
  [Space.Large]: 'marginLLeft',
  [Space.XLarge]: 'marginXSLeft',
  [Space.XXLarge]: 'marginXXLLeft',
};

export const spaceRightClassNames: { [K in Space]: string } = {
  [Space.None]: 'marginZeroRight',
  [Space.XXSmall]: 'marginXXSRight',
  [Space.XSmall]: 'marginXSRight',
  [Space.Small]: 'marginSRight',
  [Space.Medium]: 'marginMRight',
  [Space.Large]: 'marginLRight',
  [Space.XLarge]: 'marginXLRight',
  [Space.XXLarge]: 'marginXXLRight',
};

// Paddings

export const paddingAboveClassNames: { [K in Space]: string } = {
  [Space.None]: 'paddingZeroAbove',
  [Space.XXSmall]: 'paddingXXSAbove',
  [Space.XSmall]: 'paddingXSAbove',
  [Space.Small]: 'paddingSAbove',
  [Space.Medium]: 'paddingMAbove',
  [Space.Large]: 'paddingLAbove',
  [Space.XLarge]: 'paddingXLAbove',
  [Space.XXLarge]: 'paddingXXLAbove',
};

export const paddingBelowClassNames: { [K in Space]: string } = {
  [Space.None]: 'paddingZeroBelow',
  [Space.XXSmall]: 'paddingXXSBelow',
  [Space.XSmall]: 'paddingXSBelow',
  [Space.Small]: 'paddingSBelow',
  [Space.Medium]: 'paddingMBelow',
  [Space.Large]: 'paddingLBelow',
  [Space.XLarge]: 'paddingXLBelow',
  [Space.XXLarge]: 'paddingXXLBelow',
};

export const paddingLeftClassNames: { [K in Space]: string } = {
  [Space.None]: 'paddingZeroLeft',
  [Space.XXSmall]: 'paddingXXSLeft',
  [Space.XSmall]: 'paddingXSLeft',
  [Space.Small]: 'paddingSLeft',
  [Space.Medium]: 'paddingMLeft',
  [Space.Large]: 'paddingLLeft',
  [Space.XLarge]: 'paddingXLLeft',
  [Space.XXLarge]: 'paddingXXLLeft',
};

export const paddingRightClassNames: { [K in Space]: string } = {
  [Space.None]: 'paddingZeroRight',
  [Space.XXSmall]: 'paddingXXSRight',
  [Space.XSmall]: 'paddingXSRight',
  [Space.Small]: 'paddingSRight',
  [Space.Medium]: 'paddingMRight',
  [Space.Large]: 'paddingLRight',
  [Space.XLarge]: 'paddingXLRight',
  [Space.XXLarge]: 'paddingXXLRight',
};

export interface SpacingProps {
  spaceAbove?: Space;
  spaceBelow?: Space;
  spaceLeft?: Space;
  spaceRight?: Space;
  paddingAbove?: Space;
  paddingBelow?: Space;
  paddingLeft?: Space;
  paddingRight?: Space;
}
