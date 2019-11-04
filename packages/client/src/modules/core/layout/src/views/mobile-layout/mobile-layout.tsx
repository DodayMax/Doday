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
import { layoutStateSelector } from '../../redux/selectors';
import { toggleDrawerActionCreator } from '../../redux/actions';
import { Spot } from '@root/modules/module-wrapper';
import { LayoutSpot, LayoutType, ModuleType, DrawerSpot } from '@doday/lib';
import { DodayBottomNavigation } from '@components/bottom-navigation/bottom-navigation';
import { DodaySpeedDial } from '@components/speed-dial/speed-dial';
import { logo } from '@core/topbar/src/views/desktop-topbar/desktop-topbar';

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
            <Spot
              layoutType={LayoutType.Mobile}
              spot={LayoutSpot.TopBar}
              moduleTypes={[ModuleType.Core]}
            />
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
              <Spot
                renderAll
                moduleTypes={[ModuleType.Tool, ModuleType.Core]}
                spot={DrawerSpot.ToolItem}
              />
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
            <Spot spot={LayoutSpot.Page} moduleTypes={[ModuleType.Core]} />
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
