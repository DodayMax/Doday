import {
  RouteType,
  ModuleSysname,
  DodayRoute,
  Route,
  RouteSysname,
  STACKED_ROUTES,
} from '@doday/lib';

export const routes = {
  details: {
    sysname: RouteSysname.ModuleDetails,
    path: `${STACKED_ROUTES.module}/:id`,
    type: RouteType.Stacked,
    pattern: new RegExp(`\(${STACKED_ROUTES.module})\/([a-z0-9]+)`),
    create: (id: string) =>
      new DodayRoute(`${STACKED_ROUTES.module}`).params({ id }),
    parse: (url: string): Route | undefined => {
      const result = url.match(
        new RegExp(`\(${STACKED_ROUTES.module})\/([a-z0-9]+)`)
      );
      if (result.length) {
        return {
          path: `${STACKED_ROUTES.module}/:id`,
          base: result[1],
          params: {
            id: result[2],
          },
          url,
        };
      }
    },
    provider: ModuleSysname.MS,
  },
};
