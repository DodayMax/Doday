import React from 'react';
import classnames from 'classnames';
import {
  AppBar,
  withStyles,
  WithStyles,
  SwipeableDrawer,
  CssBaseline,
  Box,
} from '@material-ui/core';
import { mobileStyles } from './css.mobile-layout';
import { useDispatch, useSelector } from 'react-redux';
import { layoutStateSelector } from '../../duck/selectors';
import { toggleDrawerActionCreator } from '../../duck/actions';
import { Spot } from '@root/modules/module-wrapper';
import { LayoutSpot, LayoutType } from '@doday/lib';

export const MobileLayout = withStyles(mobileStyles, { withTheme: true })(
  (props: WithStyles) => {
    const dispatch = useDispatch();
    const { classes } = props;
    const layoutState = useSelector(layoutStateSelector);

    return (
      <>
        <CssBaseline />
        <AppBar position="fixed" className={classnames(classes.topbar)}>
          <Box height={64} px={2}>
            <Spot layoutType={LayoutType.Mobile} spot={LayoutSpot.TopBar} />
          </Box>
        </AppBar>
        <SwipeableDrawer
          open={!layoutState.isDrawerCollapsed}
          onClose={() => dispatch(toggleDrawerActionCreator(true))}
          onOpen={() => dispatch(toggleDrawerActionCreator(false))}
        >
          <div className={classes.drawer}>drawer</div>
        </SwipeableDrawer>
        <main className={classes.content}>
          <div style={{ height: '64px' }}></div>
          <Box
            position="relative"
            display="flex"
            flexGrow={1}
            style={{ height: 'calc(100vh - 64px)' }}
          >
            page
            <div className={classes.speedDial}>Speed dial</div>
          </Box>
        </main>
      </>
    );
  }
);
