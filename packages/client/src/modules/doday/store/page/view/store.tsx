import React from 'react';
import { StoreSpot } from '@doday/lib';
import { routes } from '../routes';
import { NavigationRoute, Spot, Page } from '@root/components';

export const DodayStore = props => {
  // Get current module for StoreSpot.Filter
  // Use selector to get state of the StoreSpot.Filter module
  // Create useEffect for props of selected state of the filter to refetch dodays with params
  // Provide infinite load function to pass it to the StoreSpot.Grid module
  return (
    <NavigationRoute base path={routes.store.pattern}>
      {route => (
        <Page base>
          <Spot sysname={StoreSpot.Filter} query={route.query} />
          <Spot sysname={StoreSpot.Masonry} />
        </Page>
      )}
    </NavigationRoute>
  );
};
