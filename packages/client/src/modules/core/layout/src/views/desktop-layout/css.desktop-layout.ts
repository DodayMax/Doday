import { Theme, createStyles } from '@material-ui/core';

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

export const desktopStyles = (theme: Theme) =>
  createStyles({
    // root container
    root: {
      display: 'flex',
    },
    mainContentContainer: {
      height: 'calc(100vh - 64px)',
    },
    // Topbar layout spot styles
    topbar: {
      height: '64px',
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
    speedDial: {
      position: 'absolute',
      right: theme.spacing(4),
      bottom: theme.spacing(4),
      zIndex: 101,
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
      flexDirection: 'column',
    },
    sidebarContainer: {
      minWidth: '28rem',
      maxWidth: '3rem',
    },
  });
