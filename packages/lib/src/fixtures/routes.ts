import {
  RouteConfig,
  RouteSysname,
  RouteType,
  DodayRoute,
  ModuleSysname,
} from '../systems';

export const fakeRouteConfig: RouteConfig = {
  sysname: RouteSysname.Activities,
  path: 'some path',
  type: RouteType.Base,
  pattern: new RegExp('some path'),
  create: (...params: string[]) => new DodayRoute('some path'),
  parse: (path: string) => ({
    path: 'some path',
    base: 'some path',
    url: 'some path',
  }),
  provider: ModuleSysname.SignButtons,
};
