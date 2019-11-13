import {
  RouteType,
  ModuleSysname,
  DodayRoute,
  Route,
  RouteSysname,
  BASE_ROUTES,
} from '@doday/lib';

export const routes = {
  store: {
    sysname: RouteSysname.Store,
    path: BASE_ROUTES.store,
    type: RouteType.Base,
    pattern: new RegExp(`${BASE_ROUTES.store}`),
    create: () => new DodayRoute(BASE_ROUTES.store),
    parse: (path: string): Route | undefined => {
      console.log(path);
      const result = path.match(new RegExp(BASE_ROUTES.store));
      const parts = path.split('?');
      const params = {};
      if (parts.length > 1) {
        const hashes = path.slice(path.indexOf('?') + 1).split('&');
        hashes.map(hash => {
          const [key, val] = hash.split('=');
          params[key] = decodeURIComponent(val);
        });
      }
      if (result.length) {
        return {
          path: result[0],
          base: result[0],
          query: params,
          url: path,
        };
      }
    },
    provider: ModuleSysname.Store,
  },
};
