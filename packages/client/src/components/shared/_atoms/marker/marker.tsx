import * as React from 'react';
import { DodayColor, TypographySize } from '@root/lib/common-interfaces';
import { Text } from '../typography';
import { detectColor } from '@root/lib/utils';
import classnames from 'classnames';
import { LayoutBlock } from '../layout-block';

const css = require('./_marker.module.scss');

export interface MarkerProps {
  text: string;
  color?: DodayColor;
  size?: TypographySize;
  rounded?: boolean;
  bordered?: boolean;
}

export const Marker: React.FC<MarkerProps> = ({
  text,
  color,
  rounded,
  bordered,
  ...props
}) => {
  const bgColor = detectColor(color);
  const cx = classnames({
    [css.markerContainer]: true,
    [css['rounded']]: rounded,
  });
  const wrappercx = classnames({
    [css['bordered']]: bordered,
  });
  return (
    <LayoutBlock
      align="flex-center"
      valign="vflex-center"
      className={wrappercx}
    >
      <Text
        wordwrap={false}
        className={cx}
        {...props}
        style={{ backgroundColor: bgColor }}
      >
        {text}
      </Text>
    </LayoutBlock>
  );
};
