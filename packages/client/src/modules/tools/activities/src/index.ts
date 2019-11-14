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
  BaseStackSpot,
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
  | BaseStackSpot.Builder
  | BaseStackSpot.Details
  | BaseStackSpot.Progress
> = {
  status: {},
  config: {
    sysname: ModuleSysname.Activities,
    type: ModuleType.Tool,
  },
  nodes: [NodeLabel.Activity, NodeLabel.ActivityProgress, NodeLabel.Tool],
  spots: [
    DrawerSpot.ToolItem,
    LayoutSpot.Sidebar,
    NavigationSpot.BaseRoute,
    SpeedDialSpot.Item,
    StoreSpot.Card,
    BaseStackSpot.Builder,
    BaseStackSpot.Details,
    BaseStackSpot.Progress,
  ],
  getView,
  provided: {
    entities: [
      {
        doday: NodeLabel.Activity,
        progress: NodeLabel.ActivityProgress,
        behavior: [Behavior.Creatable, Behavior.Publishable],
      },
    ],
    routes: Object.values(routes),
  },
};
