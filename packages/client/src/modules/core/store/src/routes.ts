import {
  RouteModel,
  RouteType,
  ModuleSysname,
  DodayRoute,
  Route,
} from '@doday/lib';

export const routes: RouteModel[] = [
  {
    sysname: 'store',
    path: '/store',
    type: RouteType.Base,
    pattern: new RegExp('/store'),
    create: () => new DodayRoute('/store'),
    parse: (path: string): Route | undefined => {
      const result = path.match(new RegExp('/store'));
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
