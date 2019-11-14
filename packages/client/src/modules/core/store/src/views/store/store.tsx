import React from 'react';
import { Page } from '@components/page';
import { Spot } from '@root/modules/module-wrapper';
import { StoreSpot, ModuleType } from '@doday/lib';
import { NavigationRoute } from '@root/modules/core/navigation';
import { routes } from '../../routes';

export const DodayStore = props => {
  // Get current module for StoreSpot.Filter
  // Use selector to get state of the StoreSpot.Filter module
  // Create useEffect for props of selected state of the filter to refetch dodays with params
  // Provide infinite load function to pass it to the StoreSpot.Grid module
  return (
    <NavigationRoute base path={routes.store.pattern}>
      {route => (
        <Page base>
          <Spot
            spot={StoreSpot.Filter}
            moduleTypes={[ModuleType.Core]}
            query={route.query}
          />
          <Spot spot={StoreSpot.Grid} moduleTypes={[ModuleType.Core]} />
        </Page>
      )}
    </NavigationRoute>
  );
};
