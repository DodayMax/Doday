import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Toolbar,
  IconButton,
  withStyles,
  WithStyles,
  Box,
  Zoom,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { toggleDrawerActionCreator } from '@redux/layout';
import { css } from './css.mobile-topbar';
import {
  navigationStackSelector,
  popFromStackActionCreator,
} from '@redux/navigation';

export const MobileTopbar = withStyles(css)((props: WithStyles) => {
  const dispatch = useDispatch();
  const navigationStack = useSelector(navigationStackSelector);

  const { classes } = props;

  return (
    <Toolbar className={classes.topBar}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <IconButton onClick={() => dispatch(toggleDrawerActionCreator())}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Zoom in={!!navigationStack.length}>
        <IconButton
          onClick={() => {
            dispatch(popFromStackActionCreator());
          }}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      </Zoom>
    </Toolbar>
  );
});
