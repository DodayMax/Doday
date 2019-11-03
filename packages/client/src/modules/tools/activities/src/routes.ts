import {
  RouteModel,
  RouteType,
  ModuleSysname,
  DodayRoute,
  Route,
} from '@doday/lib';

export const routes = {
  activityApp: {
    sysname: 'activityApp',
    path: '/activities',
    type: RouteType.Sidebar,
    pattern: new RegExp('^/activities'),
    create: () => new DodayRoute('/activities'),
    parse: (path: string): Route | undefined => {
      const result = path.match(new RegExp('/activities'));
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
    sysname: 'activityBuilder',
    path: '/builder/activity',
    type: RouteType.Stacked,
    pattern: new RegExp('^/builder/activity'),
    create: () => new DodayRoute('/builder/activity'),
    parse: (path: string): Route | undefined => {
      const result = path.match(new RegExp('/builder/activity'));
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
