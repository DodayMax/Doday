import { ModuleObject, ModuleSysname, AppSpot, ModuleType } from '@doday/lib';
import { getView } from './views';

export const LayoutModuleObject: ModuleObject<AppSpot> = {
  status: {},
  config: {
    sysname: ModuleSysname.Layout,
    type: ModuleType.Core,
  },
  spots: [AppSpot.Default],
  getView,
};
