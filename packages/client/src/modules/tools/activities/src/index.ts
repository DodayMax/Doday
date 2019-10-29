import {
  ModuleObject,
  ModuleSysname,
  BASE_ROUTES,
  DrawerSpot,
  LayoutSpot,
  NavigationSpot,
} from '@doday/lib';
import { getView } from './views';

export const ActivitiesModuleObject: ModuleObject<
  DrawerSpot.ToolItem | LayoutSpot.Sidebar | NavigationSpot.BaseRoute
> = {
  status: {},
  config: {
    sysname: ModuleSysname.Activities,
  },
  spots: [DrawerSpot.ToolItem, LayoutSpot.Sidebar, NavigationSpot.BaseRoute],
  routes: [BASE_ROUTES.activities],
  getView,
};
