import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Toolbar,
  IconButton,
  withStyles,
  WithStyles,
  Box,
} from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { css } from './css.desktop-topbar';
import { ACLGuard } from '@root/components/acl-guard/acl-guard';
import {
  sizes,
  LayoutType,
  TopbarSpot,
  BASE_ROUTES,
  ModuleType,
} from '@doday/lib';
import { Spot } from '@root/modules/module-wrapper';
import { useSelector, useDispatch } from 'react-redux';
import { pushRouteActionCreator, baseRouteSelector } from '@core/navigation';
import ToggleButton from '@material-ui/lab/ToggleButton';
import AppsIcon from '@material-ui/icons/Apps';
import FaceIcon from '@material-ui/icons/Face';

export const logo = require('@root/assets/png/app-icon.png');

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(1),
    border: 'none',
    padding: theme.spacing(0, 2),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export const DesktopTopbar = withStyles(css)((props: WithStyles) => {
  const dispatch = useDispatch();
  const baseRoute = useSelector(baseRouteSelector);
  const { classes } = props;
  const { t } = useTranslation('topbar');

  const handleBaseUrlChange = (e, value) => {
    value &&
      dispatch(
        pushRouteActionCreator({
          path: value,
          url: value,
        })
      );
  };

  return (
    <Toolbar className={classes.topBar}>
      <Box
        display="flex"
        justifyContent="center"
        style={{ width: sizes.topbarHeight }}
      >
        <IconButton>
          <img src={logo} style={{ width: '40px', height: '40px' }} />
        </IconButton>
      </Box>
      <Box style={{ width: sizes.topbarHeight }}></Box>
      <ACLGuard
        allowed={
          <Box
            display="flex"
            flexGrow={1}
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <StyledToggleButtonGroup
                size="small"
                exclusive
                value={baseRoute.path}
                aria-label="Top bar navigation"
                onChange={handleBaseUrlChange}
              >
                <ToggleButton value={BASE_ROUTES.store}>
                  <AppsIcon />
                </ToggleButton>
                <ToggleButton value={BASE_ROUTES.profile}>
                  <FaceIcon />
                </ToggleButton>
              </StyledToggleButtonGroup>
            </Box>
          </Box>
        }
        forbidden={
          <Box mr={6}>
            <Spot
              layoutType={LayoutType.Desktop}
              spot={TopbarSpot.Right}
              moduleTypes={[ModuleType.Core]}
            />
          </Box>
        }
      />
    </Toolbar>
  );
});
