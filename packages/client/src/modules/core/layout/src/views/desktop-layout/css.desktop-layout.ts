import { Theme, createStyles } from '@material-ui/core';
import { sizes } from '@doday/lib';

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

export const desktopStyles = (theme: Theme) =>
  createStyles({
    // root container
    root: {
      display: 'flex',
    },
    mainContentContainer: {
      marginTop: sizes.topbarHeight,
      height: `calc(100vh - ${sizes.topbarHeight}px)`,
    },
    // Topbar layout spot styles
    topbar: {
      height: sizes.topbarHeight,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.grey[900],
    },
    topbarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: collapsedDrawerWidth,
    },
    content: {
      display: 'flex',
      flex: '1',
      height: '100vh',
      overflow: 'hidden',
    },
    sidebarContainer: {
      minWidth: sizes.sidebarWidth,
      maxWidth: '3rem',
      marginTop: sizes.topbarHeight,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 2,
    },
  });
