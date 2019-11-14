import {
  ModuleObject,
  ModuleSysname,
  NodeLabel,
  ModuleType,
  NavigationSpot,
} from '@doday/lib';
import { Behavior } from '@doday/lib/dist/src/models/entity';

export const MSModuleObject: ModuleObject<NavigationSpot.StackedRoute> = {
  status: {},
  config: {
    sysname: ModuleSysname.MS,
    type: ModuleType.Core,
  },
  provided: {
    entities: [
      {
        doday: NodeLabel.Tool,
        progress: NodeLabel.ToolProgress,
        behavior: [Behavior.Publishable],
      },
    ],
  },
};
