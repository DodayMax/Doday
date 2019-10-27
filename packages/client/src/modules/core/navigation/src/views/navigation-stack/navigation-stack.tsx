import React from 'react';
import { useSelector } from 'react-redux';
import { navigationStateSelector } from '../../redux/selectors';
import { ModuleWrapper } from '@root/modules/module-wrapper';
import { NavigationSpot } from '@doday/lib';

export const NavigationStack = () => {
  const navStack = useSelector(navigationStateSelector);

  return (
    <>
      <ModuleWrapper spot={NavigationSpot.BaseRoute} route={navStack.base} />
      {navStack && navStack.stack.length
        ? navStack.stack.map((route, index) => {
            return (
              <ModuleWrapper
                spot={NavigationSpot.StackedRoute}
                route={route}
                style={{ zIndex: index + 1 }}
              />
            );
          })
        : null}
    </>
  );
};
