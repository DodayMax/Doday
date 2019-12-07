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
  Box,
} from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Backdrop from '@material-ui/core/Backdrop';
import { useSelector, useDispatch } from 'react-redux';
import { LayoutSpot, LayoutType, sizes, DrawerSpot } from '@doday/lib';
import { sidebarRouteSelector } from '@redux/navigation';
import { DodaySpeedDial, Spot } from '@root/components';
import { layoutStateSelector, toggleDrawerActionCreator } from '@redux/layout';

export const DesktopLayout = withStyles(desktopStyles, {
  withTheme: true,
})((props: WithStyles & WithTheme) => {
  const dispatch = useDispatch();
  const { classes } = props;
  const layoutState = useSelector(layoutStateSelector);
  const sidebarRoute = useSelector(sidebarRouteSelector);
  const toggleMenu = () => {
    dispatch(toggleDrawerActionCreator());
  };

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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classnames(classes.topbar)}>
        <Spot layoutType={LayoutType.Desktop} sysname={LayoutSpot.TopBar} />
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
          <Box
            display="flex"
            flexGrow={1}
            flexDirection="column"
            justifyContent="space-between"
            mt={`${sizes.topbarHeight}px`}
          >
            <Box>
              <Spot multiple sysname={DrawerSpot.ToolItem} />
            </Box>
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
          <section className={classes.sidebarContainer}>
            <Spot sysname={LayoutSpot.Sidebar} />
          </section>
          <React.Suspense fallback={null}>
            <Box
              position="relative"
              display="flex"
              flexGrow={1}
              className={classes.mainContentContainer}
            >
              <Spot sysname={LayoutSpot.Page} />
            </Box>
          </React.Suspense>
          <DodaySpeedDial
            open={open}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
        </main>
      </React.Suspense>
      <Backdrop open={open} className={classes.backdrop} />
    </div>
  );
});
