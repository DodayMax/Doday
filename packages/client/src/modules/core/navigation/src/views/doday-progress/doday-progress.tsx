import React from 'react';
import { NavigationRoute } from '../navigation-route/navigation-route';
import { routes } from '../../routes';
import { Spot } from '@root/modules/module-wrapper';
import { BaseStackSpot, NodeLabel, ModuleType } from '@doday/lib';

export const DodayProgress = () => {
  return (
    <NavigationRoute stacked path={routes.progress.pattern}>
      {(route, zIndex) => {
        return (
          <Spot
            spot={BaseStackSpot.Progress}
            node={NodeLabel.ActivityProgress}
            moduleTypes={[ModuleType.Tool]}
            style={{ zIndex }}
          />
        );
      }}
    </NavigationRoute>
  );
};
