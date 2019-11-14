import React from 'react';
import { NavigationRoute } from '../navigation-route/navigation-route';
import { routes } from '../../routes';
import { Box } from '@material-ui/core';
import { Spot } from '@root/modules/module-wrapper';
import { NodeLabel, BaseStackSpot, ModuleType } from '@doday/lib';

export const DodayBuilder = () => {
  return (
    <NavigationRoute stacked path={routes.builder.pattern}>
      {(route, zIndex) => {
        console.log(route);
        return (
          <Spot
            spot={BaseStackSpot.Builder}
            node={route && route.params && (route.params.sysname as NodeLabel)}
            moduleTypes={[ModuleType.Tool]}
            style={{ zIndex }}
          />
        );
      }}
    </NavigationRoute>
  );
};
