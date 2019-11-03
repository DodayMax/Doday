import {
  RouteType,
  ModuleSysname,
  DodayRoute,
  Route,
  RouteSysname,
  BASE_ROUTES,
  STACKED_ROUTES,
  NodeLabel,
} from '@doday/lib';

export const routes = {
  activityApp: {
    sysname: RouteSysname.Activities,
    path: BASE_ROUTES.activities,
    type: RouteType.Sidebar,
    pattern: new RegExp(`^${BASE_ROUTES.activities}`),
    create: () => new DodayRoute(BASE_ROUTES.activities),
    parse: (path: string): Route | undefined => {
      const result = path.match(new RegExp(BASE_ROUTES.activities));
      if (result.length) {
        return {
          path: result[0],
          url: path,
        };
      }
    },
    provider: ModuleSysname.Activities,
  },
  builder: {
    sysname: RouteSysname.ActivityBuilder,
    path: `${STACKED_ROUTES.builder}/${NodeLabel.Activity.toLowerCase()}`,
    type: RouteType.Stacked,
    pattern: new RegExp(
      `^${STACKED_ROUTES.builder}/${NodeLabel.Activity.toLowerCase()}`
    ),
    create: () =>
      new DodayRoute(
        `${STACKED_ROUTES.builder}/${NodeLabel.Activity.toLowerCase()}`
      ),
    parse: (path: string): Route | undefined => {
      const result = path.match(
        new RegExp(
          `${STACKED_ROUTES.builder}/${NodeLabel.Activity.toLowerCase()}`
        )
      );
      if (result.length) {
        return {
          path: result[0],
          url: path,
        };
      }
    },
    provider: ModuleSysname.Activities,
  },
};
