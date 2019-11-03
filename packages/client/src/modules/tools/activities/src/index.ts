import {
  ModuleObject,
  ModuleSysname,
  DrawerSpot,
  LayoutSpot,
  NavigationSpot,
  NodeLabel,
  SpeedDialSpot,
  ModuleType,
} from '@doday/lib';
import { getView } from './views';
import { Behavior } from '@doday/lib/dist/src/models/entity';
import { routes } from './routes';

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
  routes: Object.values(routes),
  getView,
};
