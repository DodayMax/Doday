import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Icons } from '../..';

interface CoinsProps {
  coins: number | string;
}

export const Coins = ({ coins }: CoinsProps) => (
  <Box display="flex" alignItems="center">
    <Box display="inline" mr={1}>
      <Typography>{coins}</Typography>
    </Box>
    <Icons.Silver />
  </Box>
);
