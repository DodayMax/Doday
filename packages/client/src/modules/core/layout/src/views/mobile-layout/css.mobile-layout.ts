import { Theme, createStyles } from '@material-ui/core';
import { sizes } from '@doday/lib';

export const mobileStyles = (theme: Theme) =>
  createStyles({
    topbar: {
      height: sizes.topbar,
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.grey[900],
    },
    topbarMock: {
      height: sizes.topbar,
    },
    page: {
      height: `calc(100vh - ${sizes.topbar}px - 54px)`,
    },
    drawer: {
      minWidth: sizes.drawer,
    },
    drawerHeader: {
      backgroundColor: theme.palette.grey[900],
      minWidth: sizes.drawer,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 2,
    },
  });
