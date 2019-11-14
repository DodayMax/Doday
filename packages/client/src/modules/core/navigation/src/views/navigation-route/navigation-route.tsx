import React from 'react';
import { Route } from '@doday/lib';
import { useSelector } from 'react-redux';
import { navigationStateSelector } from '../../redux';

export interface DodayRouteProps {
  base?: boolean;
  stacked?: boolean;
  sidebar?: boolean;
  path: RegExp;
  children: (route: Route, zIndex?: number) => React.ReactNode;
}

export const NavigationRoute = (props: DodayRouteProps) => {
  const navigation = useSelector(navigationStateSelector);

  const { base, stacked, sidebar, path, children } = props;

  let zIndex = base || sidebar ? 0 : 1;

  if (base && matchBaseRoute()) {
    return <>{children(navigation.base)}</>;
  }

  if (stacked) {
    const route = matchStackedRoute();
    if (route) {
      return <>{children(route, zIndex)}</>;
    }
  }

  if (sidebar && matchSidebarRoute()) {
    return <>{children(navigation.sidebar.route)}</>;
  }

  return null;

  function matchBaseRoute() {
    return navigation && navigation.base && path.test(navigation.base.url);
  }

  function matchStackedRoute() {
    return (
      navigation &&
      navigation.stack &&
      navigation.stack.length &&
      navigation.stack.find((route, index) => {
        if (path.test(route.url)) {
          zIndex += index + 1;
          return true;
        }
        return false;
      })
    );
  }

  function matchSidebarRoute() {
    return (
      navigation &&
      navigation.sidebar &&
      navigation.sidebar.route &&
      path.test(navigation.sidebar.route.url)
    );
  }
};
