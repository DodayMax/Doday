import { ModuleObject, ModuleSysname, ModuleType, StoreSpot } from '@doday/lib';
import { getView } from './views';

export const StoreFilterModuleObject: ModuleObject<StoreSpot.Filter> = {
  status: {},
  config: {
    sysname: ModuleSysname.StoreFilter,
    type: ModuleType.Core,
  },
  spots: [StoreSpot.Filter],
  getView,
};
