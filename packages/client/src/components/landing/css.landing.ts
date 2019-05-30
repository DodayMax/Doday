import { config } from '@styles/config';
import { Theme, createStyles } from '@material-ui/core';

export const css = (theme: Theme) =>
  createStyles({
    landingContainer: {
      backgroundColor: config.colors.black,
    },
  });
