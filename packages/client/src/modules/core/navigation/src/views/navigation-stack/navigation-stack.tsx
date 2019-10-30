import React from 'react';
import { useSelector } from 'react-redux';
import { navigationStateSelector } from '../../redux/selectors';
import { ModuleWrapper } from '@root/modules/module-wrapper';
import { NavigationSpot, ModuleType } from '@doday/lib';

export const NavigationStack = () => {
  const navStack = useSelector(navigationStateSelector);

  return (
    <>
      <ModuleWrapper
        spot={NavigationSpot.BaseRoute}
        route={navStack.base}
        moduleType={ModuleType.Core}
      />
      {navStack && navStack.stack.length
        ? navStack.stack.map((route, index) => {
            return (
              <ModuleWrapper
                spot={NavigationSpot.StackedRoute}
                route={route}
                moduleType={ModuleType.Tool}
                style={{ zIndex: index + 1 }}
              />
            );
          })
        : null}
    </>
  );
};
