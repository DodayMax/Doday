import { Theme, createStyles } from '@material-ui/core';
import { sizes } from '@doday/lib';

export const css = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.grey[900],
    },
    topBar: {
      justifyContent: 'space-between',
      height: sizes.topbar,
    },
    white: {
      color: theme.palette.common.white,
    },
  });
