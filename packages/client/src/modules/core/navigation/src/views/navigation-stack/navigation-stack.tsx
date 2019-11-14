import React from 'react';
import { useSelector } from 'react-redux';
import { navigationStateSelector } from '../../redux/selectors';
import { ModuleWrapper } from '@root/modules/module-wrapper';
import { NavigationSpot, ModuleType } from '@doday/lib';
import { BaseStack } from '../base-stack/base-stack';

export const NavigationStack = () => {
  const navigation = useSelector(navigationStateSelector);

  return (
    <>
      <ModuleWrapper
        renderAll
        spot={NavigationSpot.BaseRoute}
        moduleTypes={[ModuleType.Core, ModuleType.Tool]}
      />
      {navigation && navigation.stack.length ? (
        <>
          <BaseStack />
          {navigation.stack.map((route, index) => {
            return (
              <ModuleWrapper
                key={route.path}
                spot={NavigationSpot.StackedRoute}
                moduleTypes={[ModuleType.Tool, ModuleType.Core]}
                style={{ zIndex: index + 1 }}
              />
            );
          })}
        </>
      ) : null}
    </>
  );
};
