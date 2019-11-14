import {
  ModuleObject,
  ModuleSysname,
  LayoutSpot,
  ModuleType,
  NavigationSpot,
} from '@doday/lib';
import { getView } from './views';
import { routes } from './routes';

export const NavigationModuleObject: ModuleObject<
  LayoutSpot.Page | NavigationSpot.StackedRoute
> = {
  status: {},
  config: {
    sysname: ModuleSysname.Navigation,
    type: ModuleType.Core,
  },
  spots: [LayoutSpot.Page, NavigationSpot.StackedRoute],
  getView,
  provided: {
    routes: Object.values(routes),
  },
};
