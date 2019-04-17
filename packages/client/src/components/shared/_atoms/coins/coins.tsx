import * as React from 'react';
import { LayoutBlock } from '../layout-block';
import { Text } from '../typography';
import { Icons } from '@root/components';

const css = require('./coins.module.scss');

export const Coins = ({ coins }) => (
  <LayoutBlock valign='vflex-center'>
    <Text className={css.padded} heavy>{coins}</Text>
    <Icons.Silver />
  </LayoutBlock>
);