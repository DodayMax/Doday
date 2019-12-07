import React from 'react';
import { StoreSpot, Route, SpotConfig } from '@doday/lib';
import { routes } from '../routes';
import { NavigationRoute, Spot, Page } from '@root/components';

export interface StoreFilterSpotConfig extends SpotConfig {
  route: Route;
}

export const DodayStore = props => {
  return (
    <NavigationRoute base path={routes.store.pattern}>
      {route => (
        <Page base>
          <Spot<StoreFilterSpotConfig>
            sysname={StoreSpot.Filter}
            route={route}
          />
          <Spot sysname={StoreSpot.Masonry} />
        </Page>
      )}
    </NavigationRoute>
  );
};
