import React from 'react';
import { useSelector } from 'react-redux';
import { navigationStateSelector } from '../../redux/selectors';
import { ModuleWrapper } from '@root/modules/module-wrapper';
import { NavigationSpot, ModuleType } from '@doday/lib';

export const NavigationStack = () => {
  const navigation = useSelector(navigationStateSelector);

  return (
    <>
      <ModuleWrapper
        spot={NavigationSpot.BaseRoute}
        route={navigation.base}
        moduleTypes={[ModuleType.Core, ModuleType.Tool]}
      />
      {navigation && navigation.stack.length
        ? navigation.stack.map((route, index) => {
            return (
              <ModuleWrapper
                key={route.path}
                spot={NavigationSpot.StackedRoute}
                route={route}
                moduleTypes={[ModuleType.Tool]}
                style={{ zIndex: index + 1 }}
              />
            );
          })
        : null}
    </>
  );
};
