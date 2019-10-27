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
  Box,
} from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useSelector, useDispatch } from 'react-redux';
import { layoutStateSelector } from '../../duck/selectors';
import { toggleDrawerActionCreator } from '../../duck/actions';
import { LayoutSpot, LayoutType } from '@doday/lib';
import { Spot } from '@root/modules/module-wrapper';

export const DesktopLayout = withStyles(desktopStyles, {
  withTheme: true,
})((props: WithStyles & WithTheme) => {
  const dispatch = useDispatch();
  const { classes } = props;
  const layoutState = useSelector(layoutStateSelector);
  const toggleMenu = () => {
    dispatch(toggleDrawerActionCreator());
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classnames(classes.topbar)}>
        <Spot layoutType={LayoutType.Desktop} spot={LayoutSpot.TopBar} />
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
          <Box
            display="flex"
            flexGrow={1}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>drawer</Box>
            <Box>
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
            </Box>
          </Box>
        </Drawer>
        <main className={classes.content}>
          <section className={classes.sidebarContainer}>sidebar</section>
          <React.Suspense fallback={null}>
            <Box
              position="relative"
              display="flex"
              flexGrow={1}
              className={classes.mainContentContainer}
            >
              page
            </Box>
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
