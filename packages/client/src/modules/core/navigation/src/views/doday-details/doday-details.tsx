import React from 'react';
import { NavigationRoute } from '../navigation-route/navigation-route';
import { routes } from '../../routes';
import { Spot } from '@root/modules/module-wrapper';
import { BaseStackSpot, NodeLabel, ModuleType } from '@doday/lib';

export const DodayDetails = () => {
  return (
    <NavigationRoute stacked path={routes.details.pattern}>
      {(route, zIndex) => {
        /**
         * TODO: Determine EntityType by route.params.id and
         * pass it to the Spot component as node
         * Mocked as Activity for now
         */

        return (
          <Spot
            spot={BaseStackSpot.Details}
            node={NodeLabel.Activity}
            moduleTypes={[ModuleType.Tool]}
            style={{ zIndex }}
          />
        );
      }}
    </NavigationRoute>
  );
};
