import * as React from 'react';
import * as classnames from 'classnames';
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { LayoutBlock, Icons, Hidden } from '@doday/shared';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FaceIcon from '@material-ui/icons/Face';
import AppsIcon from '@material-ui/icons/Apps';

import { css } from './css.top-bar';
import { Hero } from '@doday/lib';
import { useDispatch } from 'react-redux';
import { pushRouteActionCreator } from '@doday/ducks';
const logo = require('@root/assets/png/app-icon.png');

export interface TopBarProps {
  hero?: Hero;
  isDrawerCollapsed?: boolean;
}

export const TopBar = withStyles(css)((props: TopBarProps & WithStyles) => {
  const dispatch = useDispatch();
  const { hero, isDrawerCollapsed, classes } = props;

  const handleBaseUrlChange = (e, value) => {
    dispatch(pushRouteActionCreator(value));
  };

  return (
    <AppBar
      position="fixed"
      className={classnames(classes.appBar, {
        [classes.appBarShift]: !isDrawerCollapsed,
      })}
    >
      <Toolbar className={classes.topBar} disableGutters={isDrawerCollapsed}>
        <LayoutBlock flex="1" valign="vflexCenter" insideElementsMargin>
          <LayoutBlock align="flexCenter" styles={{ width: '72px' }}>
            <IconButton>
              <img src={logo} style={{ width: '40px', height: '40px' }} />
            </IconButton>
          </LayoutBlock>
          <LayoutBlock styles={{ width: '280px' }}></LayoutBlock>
          <Hidden condition={!hero}>
            <LayoutBlock flex="1" align="flexCenter" valign="vflexCenter">
              <LayoutBlock>
                <ToggleButtonGroup
                  exclusive
                  onChange={handleBaseUrlChange}
                  aria-label="text alignment"
                >
                  <Tooltip title="Store" placement="bottom">
                    <ToggleButton value="/store" aria-label="left aligned">
                      <AppsIcon className={classes.white} />
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title="Profile" placement="bottom">
                    <ToggleButton value="/profile" aria-label="centered">
                      <FaceIcon />
                    </ToggleButton>
                  </Tooltip>
                </ToggleButtonGroup>
              </LayoutBlock>
            </LayoutBlock>
          </Hidden>
        </LayoutBlock>
        <Hidden condition={!!hero}>
          <LayoutBlock>
            <IconButton href="/auth/google" data-test-id="google-button">
              <Icons.Google />
            </IconButton>
          </LayoutBlock>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
});
