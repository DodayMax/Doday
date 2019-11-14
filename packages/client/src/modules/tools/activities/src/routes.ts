import {
  RouteType,
  ModuleSysname,
  DodayRoute,
  Route,
  RouteSysname,
  SIDEBAR_ROUTES,
} from '@doday/lib';

export const routes = {
  activityApp: {
    sysname: RouteSysname.Activities,
    path: `/${SIDEBAR_ROUTES.activities}`,
    type: RouteType.Sidebar,
    pattern: new RegExp(`^/${SIDEBAR_ROUTES.activities}$`),
    create: () => new DodayRoute(SIDEBAR_ROUTES.activities),
    parse: (path: string): Route | undefined => {
      const result = path.match(new RegExp(`^/${SIDEBAR_ROUTES.activities}$`));
      if (result.length) {
        return {
          path: result[0],
          base: result[0],
          url: path,
        };
      }
    },
    provider: ModuleSysname.Activities,
  },
};
