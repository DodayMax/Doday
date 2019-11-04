import { ModuleObject, ModuleSysname, NodeLabel, ModuleType } from '@doday/lib';
import { Behavior } from '@doday/lib/dist/src/models/entity';

export const MSModuleObject: ModuleObject = {
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
};
