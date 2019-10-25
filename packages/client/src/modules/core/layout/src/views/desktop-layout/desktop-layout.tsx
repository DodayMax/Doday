import React from 'react';
import classnames from 'classnames';
import { desktopStyles } from './css.desktop-layout';
import {
  withStyles,
  WithStyles,
  WithTheme,
  CssBaseline,
  AppBar,
  Drawer,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItem,
  Zoom,
} from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useSelector, useDispatch } from 'react-redux';
import { layoutStateSelector } from '../../duck/selectors';
import { toggleDrawerActionCreator } from '../../duck/actions';
import { LayoutBlock } from '@doday/shared';
import { RootState, LayoutSpot, LayoutType } from '@doday/lib';
import { ModuleWrapper } from '@root/modules/module-wrapper';

export const DesktopLayout = withStyles(desktopStyles, {
  withTheme: true,
})((props: WithStyles & WithTheme) => {
  const dispatch = useDispatch();
  const { classes } = props;
  const layoutState = useSelector(layoutStateSelector);
  const toggleMenu = () => {
    dispatch(toggleDrawerActionCreator());
  };

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
        layoutType={LayoutType.Desktop}
        spot={LayoutSpot.TopBar}
      />
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classnames(classes.topbar)}>
        {getViewForTopbarSpot()}
      </AppBar>
      <React.Suspense fallback={null}>
        <Drawer
          variant="permanent"
          className={classnames(classes.drawer, {
            [classes.drawerOpen]: !layoutState.isDrawerCollapsed,
            [classes.drawerClose]: layoutState.isDrawerCollapsed,
          })}
          classes={{
            paper: classnames({
              [classes.drawerOpen]: !layoutState.isDrawerCollapsed,
              [classes.drawerClose]: layoutState.isDrawerCollapsed,
            }),
          }}
          open={!layoutState.isDrawerCollapsed}
        >
          <div className={classes.toolbar} />
          <LayoutBlock flex="1" direction="column" align="spaceBetween">
            <LayoutBlock>drawer</LayoutBlock>
            <LayoutBlock>
              <Divider />
              <ListItem button onClick={toggleMenu}>
                <ListItemIcon>
                  {layoutState.isDrawerCollapsed ? (
                    <KeyboardArrowRightIcon color="action" fontSize="large" />
                  ) : (
                    <KeyboardArrowLeftIcon color="action" fontSize="large" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={'Collapse drawer'}
                  primaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
            </LayoutBlock>
          </LayoutBlock>
        </Drawer>
        <main className={classes.content}>
          <section className={classes.sidebarContainer}>sidebar</section>
          <React.Suspense fallback={null}>
            <LayoutBlock
              relative
              flex={'1'}
              className={classes.mainContentContainer}
            >
              page
            </LayoutBlock>
          </React.Suspense>
          <div className={classes.speedDial}>
            <Zoom
              in={
                true
                // !!Object.values(activeTools) &&
                // !!Object.values(activeTools).length
              }
            >
              <span>speed dial</span>
            </Zoom>
          </div>
        </main>
      </React.Suspense>
    </div>
  );
});
