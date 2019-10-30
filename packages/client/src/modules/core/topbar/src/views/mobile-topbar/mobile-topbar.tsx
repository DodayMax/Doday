import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Toolbar,
  IconButton,
  withStyles,
  WithStyles,
  Box,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { toggleDrawerActionCreator } from '@core/layout';
import { css } from './css.mobile-topbar';

export const MobileTopbar = withStyles(css)((props: WithStyles) => {
  const dispatch = useDispatch();

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
    </Toolbar>
  );
});
