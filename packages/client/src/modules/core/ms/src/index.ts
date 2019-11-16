import {
  ModuleObject,
  ModuleSysname,
  NodeLabel,
  ModuleType,
  StoreSpot,
  BaseStackSpot,
} from '@doday/lib';
import { Behavior } from '@doday/lib/dist/src/models/entity';
import { getView } from './views';

export const MSModuleObject: ModuleObject<
  StoreSpot.Card | BaseStackSpot.Details
> = {
  status: {},
  config: {
    sysname: ModuleSysname.MS,
    type: ModuleType.Core,
  },
  spots: [StoreSpot.Card, BaseStackSpot.Details],
  getView,
  provided: {
    entities: [
      {
        doday: NodeLabel.Tool,
        progress: NodeLabel.Progress,
        behavior: [Behavior.Publishable],
      },
    ],
  },
};
