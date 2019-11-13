import {
  ModuleObject,
  ModuleSysname,
  NodeLabel,
  ModuleType,
  StoreSpot,
  NavigationSpot,
} from '@doday/lib';
import { Behavior } from '@doday/lib/dist/src/models/entity';
import { getView } from './views';
import { routes } from './routes';

export const MSModuleObject: ModuleObject<NavigationSpot.StackedRoute> = {
  status: {},
  config: {
    sysname: ModuleSysname.MS,
    type: ModuleType.Core,
  },
  nodes: [NodeLabel.Module, NodeLabel.ModuleProgress],
  entities: [
    {
      doday: NodeLabel.Module,
      progress: NodeLabel.ModuleProgress,
      behavior: [Behavior.Publishable],
    },
  ],
  spots: [NavigationSpot.StackedRoute],
  routes: Object.values(routes),
  getView,
};
