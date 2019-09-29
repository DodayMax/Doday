import { Theme, createStyles } from '@material-ui/core';
import { spacing } from '@material-ui/system';

const drawerWidth = 240;

export const css = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
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
    },
    speedDial: {
      position: 'absolute',
      right: theme.spacing(4),
      bottom: theme.spacing(4),
      zIndex: 101,
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    white: {
      color: theme.palette.common.white,
    },
    hide: {
      display: 'none',
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
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flexEnd',
      ...theme.mixins.toolbar,
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
