import React from 'react';
import { Page } from '@root/components/page';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
  pushRouteActionCreator,
  NavigationRoute,
} from '@root/modules/core/navigation';
import { routes } from '../../routes';
import { DodayRoutes, RouteSysname } from '@doday/lib';

export const MobileActivitiesApp = () => {
  const dispatch = useDispatch();

  return (
    <NavigationRoute base path={routes.activityApp.pattern}>
      {route => (
        <Page base>
          Activities Sidebar
          <Button
            onClick={() => {
              dispatch(
                pushRouteActionCreator(
                  DodayRoutes.routes[RouteSysname.DodayDetails]
                    .create('k1j3kj12j31kkkk')
                    .build()
                )
              );
            }}
          >
            Push route
          </Button>
        </Page>
      )}
    </NavigationRoute>
  );
};
