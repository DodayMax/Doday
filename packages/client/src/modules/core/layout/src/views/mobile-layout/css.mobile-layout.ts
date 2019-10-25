import { Theme, createStyles } from '@material-ui/core';

export const mobileStyles = (theme: Theme) =>
  createStyles({
    topbar: {
      height: '64px',
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.grey[900],
    },
    drawer: {
      minWidth: '240px',
    },
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  });
