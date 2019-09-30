import React from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import { navStackSelector } from '@doday/duck';
import { Builder } from '@root/components';
import { Store } from '../pages/store';
import { Profile } from '../pages/profile';
import { DodayDetails } from '../pages/doday-details/doday-details';
import { ProgressDetails } from '../pages/progress-details';

export const NavigationStack = () => {
  const navStack = useSelector(navStackSelector);

  const BaseComponent = getComponentForRoute(navStack.base);
  return (
    <>
      {BaseComponent ? <BaseComponent /> : null}
      {navStack && navStack.stack.length
        ? navStack.stack.map((route, index) => {
            const Component = getComponentForRoute(route);
            return Component ? (
              <Component key={route} style={{ zIndex: 1 + index }} />
            ) : null;
          })
        : null}
    </>
  );
};

export function getComponentForRoute(route: string) {
  switch (true) {
    case !!route.match(/\/store/gi):
      return Store;
    case !!route.match(/\/profile/gi):
      return Profile;
    case !!route.match(/\/dodays\//gi):
      return DodayDetails;
    case !!route.match(/\/progress\//gi):
      return ProgressDetails;
    case !!route.match(/\/builder\//gi):
      return Builder;
  }
  return null;
}
