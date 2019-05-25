import * as React from 'react';
import { LayoutBlock } from '../layout-block';
import { Text } from '../typography';
import { Icons } from '@shared';

const css = require('./coins.module.scss');

export const Coins = ({ coins }) => (
  <LayoutBlock valign="vflexCenter">
    <Text className={css.padded} heavy>
      {coins}
    </Text>
    <Icons.Silver />
  </LayoutBlock>
);
