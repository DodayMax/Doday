import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
  pushRouteActionCreator,
  NavigationRoute,
} from '@root/modules/core/navigation';
import { DodayRoutes, RouteSysname } from '@doday/lib';
import { routes } from '../../routes';

export const ActivitiesApp = () => {
  const dispatch = useDispatch();

  return (
    <NavigationRoute sidebar path={routes.activityApp.pattern}>
      {route => (
        <Box display="flex" flexDirection="column">
          <div>Activities Sidebar</div>
          <Button
            onClick={() => {
              dispatch(
                pushRouteActionCreator(
                  DodayRoutes.routes[RouteSysname.DodayProgress]
                    .create('qwehj123j12h3')
                    .build()
                )
              );
            }}
          >
            Push route
          </Button>
        </Box>
      )}
    </NavigationRoute>
  );
};
