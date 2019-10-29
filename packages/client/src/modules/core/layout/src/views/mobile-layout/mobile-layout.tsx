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
  ListItem,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { mobileStyles } from './css.mobile-layout';
import { useDispatch, useSelector } from 'react-redux';
import { layoutStateSelector } from '../../redux/selectors';
import { toggleDrawerActionCreator } from '../../redux/actions';
import { Spot, ModuleWrapper } from '@root/modules/module-wrapper';
import {
  LayoutSpot,
  LayoutType,
  sizes,
  DrawerSpot,
  BASE_ROUTES,
} from '@doday/lib';
import { DodayBottomNavigation } from '@root/components/bottom-navigation/bottom-navigation';
import { DodaySpeedDial } from '@root/components/speed-dial/speed-dial';
import { logo } from '@root/modules/core/topbar/src/views/desktop-topbar/desktop-topbar';
import { pushRouteActionCreator } from '@root/modules/core/navigation/src/redux';
import { allLoadedModulesSelector } from '@root/modules/redux/ms/selectors';

export const MobileLayout = withStyles(mobileStyles, { withTheme: true })(
  (props: WithStyles) => {
    const dispatch = useDispatch();
    const { classes } = props;
    const layoutState = useSelector(layoutStateSelector);

    /**
     * Find :Tool modules for drawer's menu
     */
    const allModules = useSelector(allLoadedModulesSelector);
    const tools = Object.values(allModules).filter(
      module => module.spots && module.spots.includes(DrawerSpot.ToolItem)
    );

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
            <Spot layoutType={LayoutType.Mobile} spot={LayoutSpot.TopBar} />
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
              {tools.map(tool => (
                <ListItem
                  key={tool.config.sysname}
                  button
                  onClick={() => {
                    dispatch(pushRouteActionCreator(`/${tool.config.sysname}`));
                    dispatch(toggleDrawerActionCreator());
                  }}
                >
                  <ModuleWrapper module={tool} spot={DrawerSpot.ToolItem} />
                </ListItem>
              ))}
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
            <Spot spot={LayoutSpot.Page} />
            <DodaySpeedDial
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          </Box>
        </main>
        <DodayBottomNavigation />
        <Backdrop open={open} className={classes.backdrop} />
      </>
    );
  }
);
