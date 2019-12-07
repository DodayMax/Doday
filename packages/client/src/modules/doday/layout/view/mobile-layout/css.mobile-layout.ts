import { Theme, createStyles } from '@material-ui/core';
import { sizes } from '@doday/lib';

export const mobileStyles = (theme: Theme) =>
  createStyles({
    topbar: {
      height: sizes.topbarHeight,
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.grey[900],
    },
    topbarMock: {
      height: sizes.topbarHeight,
    },
    page: {
      height: `calc(100vh - ${sizes.topbarHeight}px - 54px)`,
    },
    drawer: {
      minWidth: sizes.drawerWidth,
    },
    drawerHeader: {
      backgroundColor: theme.palette.grey[900],
      minWidth: sizes.drawerWidth,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 2,
    },
    bottomNavigation: {
      position: 'relative',
      zIndex: theme.zIndex.mobileStepper,
    },
  });
