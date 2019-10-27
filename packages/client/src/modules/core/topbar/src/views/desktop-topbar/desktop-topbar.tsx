import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Toolbar,
  IconButton,
  Tooltip,
  withStyles,
  WithStyles,
  Button,
  Box,
} from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FaceIcon from '@material-ui/icons/Face';
import AppsIcon from '@material-ui/icons/Apps';

import { css } from './css.desktop-topbar';
import { ACLGuard } from '@root/components/acl-guard/acl-guard';
import { sizes } from '@doday/lib';
const logo = require('@root/assets/png/app-icon.png');

export const DesktopTopbar = withStyles(css)((props: WithStyles) => {
  const { classes } = props;
  const { t } = useTranslation('topbar');

  // const handleBaseUrlChange = (e, value) => {
  //   dispatch(pushRouteActionCreator(value));
  // };

  // const handleSignInWithGoogle = () => {
  //   dispatch(signInWithGoogleActionCreator());
  // };

  return (
    <Toolbar className={classes.topBar}>
      <Box
        display="flex"
        justifyContent="center"
        style={{ width: sizes.topbar }}
      >
        <IconButton>
          <img src={logo} style={{ width: '40px', height: '40px' }} />
        </IconButton>
      </Box>
      <Box style={{ width: sizes.sidebar }}></Box>
      <ACLGuard
        allowed={
          <Box
            display="flex"
            flexGrow={1}
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <ToggleButtonGroup
                exclusive
                // onChange={handleBaseUrlChange}
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
            </Box>
          </Box>
        }
        forbidden={
          <Box mr={6}>
            <Button>{t('topbar:signButton.label')}</Button>
          </Box>
        }
      />
    </Toolbar>
  );
});
