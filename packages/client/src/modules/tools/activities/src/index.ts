import {
  ModuleObject,
  ModuleSysname,
  BASE_ROUTES,
  DrawerSpot,
  LayoutSpot,
  NavigationSpot,
  NodeLabel,
  STACKED_ROUTES,
  SpeedDialSpot,
  ModuleType,
} from '@doday/lib';
import { getView } from './views';
import { Behavior } from '@doday/lib/dist/src/models/entity';

export const ActivitiesModuleObject: ModuleObject<
  | DrawerSpot.ToolItem
  | LayoutSpot.Sidebar
  | NavigationSpot.BaseRoute
  | NavigationSpot.StackedRoute
  | SpeedDialSpot.Item
> = {
  status: {},
  config: {
    sysname: ModuleSysname.Activities,
    type: ModuleType.Tool,
  },
  nodes: [NodeLabel.Activity, NodeLabel.ActivityProgress],
  entities: [
    {
      doday: NodeLabel.Activity,
      progress: NodeLabel.ActivityProgress,
      behavior: [Behavior.Creatable, Behavior.Publishable],
    },
  ],
  spots: [
    DrawerSpot.ToolItem,
    LayoutSpot.Sidebar,
    NavigationSpot.BaseRoute,
    NavigationSpot.StackedRoute,
    SpeedDialSpot.Item,
  ],
  routes: [
    BASE_ROUTES.activities,
    `${STACKED_ROUTES.builder}/${NodeLabel.Activity.toLowerCase()}`,
  ],
  getView,
};
