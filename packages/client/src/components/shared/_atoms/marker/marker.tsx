import * as React from 'react';
import { DodayColors, TypographySize } from '@root/lib/common-interfaces';
import { Text } from '../typography';
import { detectColor } from '@root/lib/utils';
import classnames from 'classnames';

const css = require('./_marker.module.scss');

export interface MarkerProps {
  text: string;
  color?: DodayColors;
  size?: TypographySize;
  rounded?: boolean;
}

export const Marker: React.SFC<MarkerProps> = ({
  text,
  color,
  rounded,
  ...props
}) => {
  const bgColor = detectColor(color);
  const cx = classnames({
    [css.markerContainer]: true,
    [css['rounded']]: rounded,
  });
  return (
    <Text
      wordwrap={false}
      className={cx}
      text={text}
      {...props}
      style={{ backgroundColor: bgColor }}
    />
  );
};
