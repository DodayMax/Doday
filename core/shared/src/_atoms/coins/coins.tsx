import * as React from 'react';
import { LayoutBlock } from '../layout-block';
import { Icons } from '@shared';
import {
  Theme,
  createStyles,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { config } from '@root/styles/config';

const css = (theme: Theme) =>
  createStyles({
    padded: {
      marginRight: config.spacing.spaceXXS,
    },
  });

interface CoinsProps {
  coins: number | string;
}

export const Coins = withStyles(css)(
  ({ coins, classes }: CoinsProps & WithStyles) => (
    <LayoutBlock valign="vflexCenter">
      <Typography className={classes.padded}>{coins}</Typography>
      <Icons.Silver />
    </LayoutBlock>
  )
);
