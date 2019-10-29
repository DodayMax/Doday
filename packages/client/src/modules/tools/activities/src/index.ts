import {
  ModuleObject,
  ModuleSysname,
  BASE_ROUTES,
  DrawerSpot,
  LayoutSpot,
} from '@doday/lib';
import { getView } from './views';

export const ActivitiesModuleObject: ModuleObject<
  DrawerSpot.ToolItem | LayoutSpot.Sidebar
> = {
  status: {},
  config: {
    sysname: ModuleSysname.Activities,
  },
  spots: [DrawerSpot.ToolItem, LayoutSpot.Sidebar],
  routes: [BASE_ROUTES.activities],
  getView,
};
