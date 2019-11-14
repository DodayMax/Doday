import {
  RouteModel,
  RouteType,
  ModuleSysname,
  DodayRoute,
  Route,
  BASE_ROUTES,
  RouteSysname,
} from '@doday/lib';

export const routes = {
  profile: {
    sysname: RouteSysname.Profile,
    path: `/${BASE_ROUTES.profile}`,
    type: RouteType.Base,
    pattern: new RegExp(`^/${BASE_ROUTES.profile}`),
    create: () => new DodayRoute(BASE_ROUTES.profile),
    parse: (path: string): Route | undefined => {
      const result = path.match(new RegExp(`^/${BASE_ROUTES.profile}`));
      if (result.length) {
        return {
          path: result[0],
          base: result[0],
          url: path,
        };
      }
    },
    provider: ModuleSysname.Profile,
  },
};
