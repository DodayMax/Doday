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
import { LayoutBlock } from '@doday/shared';
import { ModuleWrapper } from '@root/modules/module-wrapper';
import { RootState, LayoutSpot, LayoutType } from '@doday/lib';

export const MobileLayout = withStyles(mobileStyles, { withTheme: true })(
  (props: WithStyles) => {
    const dispatch = useDispatch();
    const { classes } = props;
    const layoutState = useSelector(layoutStateSelector);

    const modules = useSelector((state: RootState) => state.ms.modules);
    /**
     * Find all tools supports "LayoutSpot.TopBar"
     */
    const getViewForTopbarSpot = () => {
      const topbarModules = Object.values(modules).filter(
        module => module.spots && module.spots.includes(LayoutSpot.TopBar)
      );
      /**
       * Later we will have `active` option for modules that takes
       * same spot. For now take just first.
       */
      const chosenModule = topbarModules.length && topbarModules[0];
      if (!chosenModule) return;
      return (
        <ModuleWrapper
          moduleObject={chosenModule}
          layoutType={LayoutType.Mobile}
          spot={LayoutSpot.TopBar}
        />
      );
    };

    return (
      <>
        <CssBaseline />
        <AppBar position="fixed" className={classnames(classes.topbar)}>
          <Box height={64} px={2}>
            {getViewForTopbarSpot()}
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
          <LayoutBlock
            relative
            flex="1"
            styles={{ height: 'calc(100vh - 64px)' }}
          >
            page
            <div className={classes.speedDial}>Speed dial</div>
          </LayoutBlock>
        </main>
      </>
    );
  }
);
