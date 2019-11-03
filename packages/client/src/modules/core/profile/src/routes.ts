import {
  RouteModel,
  RouteType,
  ModuleSysname,
  DodayRoute,
  Route,
} from '@doday/lib';

export const routes: RouteModel[] = [
  {
    sysname: 'profile',
    path: '/profile',
    type: RouteType.Base,
    pattern: new RegExp('/profile'),
    create: () => new DodayRoute('/profile'),
    parse: (path: string): Route | undefined => {
      const result = path.match(new RegExp('/profile'));
      if (result.length) {
        return {
          path: result[0],
          url: path,
        };
      }
    },
    provider: ModuleSysname.Profile,
  },
];
