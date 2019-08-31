import { Theme, createStyles } from '@material-ui/core';

export const css = (theme: Theme) =>
  createStyles({
    landingContainer: {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.action.active,
    },
  });
