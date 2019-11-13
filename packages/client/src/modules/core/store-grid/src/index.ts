import { ModuleObject, ModuleSysname, ModuleType, StoreSpot } from '@doday/lib';
import { getView } from './views';

export const StoreGridModuleObject: ModuleObject<StoreSpot.Grid> = {
  status: {},
  config: {
    sysname: ModuleSysname.StoreGrid,
    type: ModuleType.Core,
  },
  spots: [StoreSpot.Grid],
  getView,
};
