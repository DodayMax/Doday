import * as React from 'react';
import { DodayColors } from '@root/lib/common-interfaces';
import { Text } from '../typography';
import { detectColor } from '@root/lib/utils';

const css = require('./_marker.module.scss');

export interface MarkerProps {
  text: string;
  color: DodayColors;
}

export const Marker: React.SFC<MarkerProps> = ({ text, color }) => {
  const bgColor = detectColor(color);
  return (
    <Text
      className={css.markerContainer}
      text={text}
      style={{ backgroundColor: bgColor }}
    />
  );
};
