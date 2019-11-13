import {
  ModuleObject,
  ModuleSysname,
  DrawerSpot,
  LayoutSpot,
  NavigationSpot,
  NodeLabel,
  SpeedDialSpot,
  ModuleType,
  StoreSpot,
  Behavior,
} from '@doday/lib';
import { getView } from './views';
import { routes } from './routes';

export const ActivitiesModuleObject: ModuleObject<
  | DrawerSpot.ToolItem
  | LayoutSpot.Sidebar
  | NavigationSpot.BaseRoute
  | NavigationSpot.StackedRoute
  | SpeedDialSpot.Item
  | StoreSpot.Card
> = {
  status: {},
  config: {
    sysname: ModuleSysname.Activities,
    type: ModuleType.Tool,
  },
  nodes: [NodeLabel.Activity, NodeLabel.ActivityProgress, NodeLabel.Module],
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
    StoreSpot.Card,
  ],
  routes: Object.values(routes),
  getView,
};
