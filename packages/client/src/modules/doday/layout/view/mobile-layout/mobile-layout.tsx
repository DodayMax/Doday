import React from 'react';
import classnames from 'classnames';
import {
  AppBar,
  withStyles,
  WithStyles,
  SwipeableDrawer,
  CssBaseline,
  Box,
  IconButton,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { mobileStyles } from './css.mobile-layout';
import { useDispatch, useSelector } from 'react-redux';
import { layoutStateSelector, toggleDrawerActionCreator } from '@redux/layout';
import { LayoutSpot, LayoutType, DrawerSpot } from '@doday/lib';
import {
  Spot,
  DodayBottomNavigation,
  DodaySpeedDial,
  logo,
} from '@root/components';

export const MobileLayout = withStyles(mobileStyles, { withTheme: true })(
  (props: WithStyles) => {
    const dispatch = useDispatch();
    const { classes } = props;
    const layoutState = useSelector(layoutStateSelector);

    /**
     * SpeedDial state and handlers
     */
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <CssBaseline />
        <AppBar position="fixed" className={classnames(classes.topbar)}>
          <Box height={64} px={2}>
            <Spot layoutType={LayoutType.Mobile} sysname={LayoutSpot.TopBar} />
          </Box>
        </AppBar>
        <SwipeableDrawer
          open={!layoutState.isDrawerCollapsed}
          onClose={() => dispatch(toggleDrawerActionCreator(true))}
          onOpen={() => dispatch(toggleDrawerActionCreator(false))}
        >
          <Box className={classes.drawer}>
            <Box
              display="flex"
              justifyContent="center"
              className={classes.drawerHeader}
            >
              <IconButton>
                <img src={logo} style={{ width: '40px', height: '40px' }} />
              </IconButton>
            </Box>
            <Box>
              <Spot multiple sysname={DrawerSpot.ToolItem} />
            </Box>
          </Box>
        </SwipeableDrawer>
        <main>
          <div className={classes.topbarMock}></div>
          <Box
            position="relative"
            display="flex"
            flexGrow={1}
            className={classes.page}
          >
            <Spot sysname={LayoutSpot.Page} />
            <DodaySpeedDial
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          </Box>
        </main>
        <DodayBottomNavigation className={classes.bottomNavigation} />
        <Backdrop open={open} className={classes.backdrop} />
      </>
    );
  }
);
