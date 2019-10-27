import { ModuleObject, ModuleSysname, AppSpot } from '@doday/lib';
import { getView } from './views';

export const LayoutModuleObject: ModuleObject<AppSpot> = {
  status: {},
  config: {
    sysname: ModuleSysname.Layout,
  },
  spots: [AppSpot.Default],
  getView,
};
