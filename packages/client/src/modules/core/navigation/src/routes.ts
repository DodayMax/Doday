import {
  RouteSysname,
  STACKED_ROUTES,
  RouteType,
  DodayRoute,
  Route,
  ModuleSysname,
  capitalize,
} from '@doday/lib';

const builder = {
  path: `/${STACKED_ROUTES.builder}/:sysname`,
  pattern: new RegExp(`^\/${STACKED_ROUTES.builder}\/([a-z]+)`),
};

const details = {
  path: `/${STACKED_ROUTES.dodays}/:id/details`,
  pattern: new RegExp(`^\/(${STACKED_ROUTES.dodays})\/([a-z0-9]+)\/details$`),
};

const progress = {
  path: `/${STACKED_ROUTES.dodays}/:id/progress`,
  pattern: new RegExp(`^\/(${STACKED_ROUTES.dodays})\/([a-z0-9]+)\/progress$`),
};

export const routes = {
  builder: {
    sysname: RouteSysname.DodayBuilder,
    path: builder.path,
    type: RouteType.Stacked,
    pattern: builder.pattern,
    create: (sysname: string) =>
      new DodayRoute(`${STACKED_ROUTES.builder}`).params({
        sysname,
      }),
    parse: (path: string): Route | undefined => {
      const result = path.match(builder.pattern);
      if (result.length) {
        return {
          path: builder.path,
          base: result[0],
          params: {
            sysname: capitalize(result[1]),
          },
          url: path,
        };
      }
    },
    provider: ModuleSysname.Activities,
  },
  details: {
    sysname: RouteSysname.DodayDetails,
    path: details.path,
    type: RouteType.Stacked,
    pattern: details.pattern,
    create: (id: string) =>
      new DodayRoute(`${STACKED_ROUTES.dodays}`).params({ id }).part('details'),
    parse: (path: string): Route | undefined => {
      const result = path.match(details.pattern);
      if (result.length) {
        return {
          path: details.path,
          base: result[1],
          params: {
            id: result[2],
          },
          url: path,
        };
      }
    },
    provider: ModuleSysname.Navigation,
  },
  progress: {
    sysname: RouteSysname.DodayProgress,
    path: progress.path,
    type: RouteType.Stacked,
    pattern: progress.pattern,
    create: (id: string) =>
      new DodayRoute(`${STACKED_ROUTES.dodays}`)
        .params({ id })
        .part('progress'),
    parse: (path: string): Route | undefined => {
      const result = path.match(progress.pattern);
      if (result.length) {
        return {
          path: progress.path,
          base: result[1],
          params: {
            id: result[2],
          },
          url: path,
        };
      }
    },
    provider: ModuleSysname.Navigation,
  },
};
