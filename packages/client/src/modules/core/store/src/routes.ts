import {
  RouteModel,
  RouteType,
  ModuleSysname,
  DodayRoute,
  Route,
  RouteSysname,
  BASE_ROUTES,
} from '@doday/lib';

export const routes: RouteModel[] = [
  {
    sysname: RouteSysname.Store,
    path: BASE_ROUTES.store,
    type: RouteType.Base,
    pattern: new RegExp(BASE_ROUTES.store),
    create: () => new DodayRoute(BASE_ROUTES.store),
    parse: (path: string): Route | undefined => {
      const result = path.match(new RegExp(BASE_ROUTES.store));
      if (result.length) {
        return {
          path: result[0],
          url: path,
        };
      }
    },
    provider: ModuleSysname.Store,
  },
];
