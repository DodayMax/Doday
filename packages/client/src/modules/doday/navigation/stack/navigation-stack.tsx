import React from 'react';
import { useSelector } from 'react-redux';
import { navigationStateSelector } from '@redux/navigation';
import { NavigationSpot } from '@doday/lib';
import { Spot } from '@root/components/spot/spot';

export const NavigationStack = () => {
  const navigation = useSelector(navigationStateSelector);

  return (
    <>
      <Spot multiple sysname={NavigationSpot.BaseRoute} />
      {navigation && navigation.stack.length ? (
        <>
          {navigation.stack.map((route, index) => {
            return (
              <Spot
                key={route.path}
                sysname={NavigationSpot.StackedRoute}
                style={{ zIndex: index + 1 }}
              />
            );
          })}
        </>
      ) : null}
    </>
  );
};
