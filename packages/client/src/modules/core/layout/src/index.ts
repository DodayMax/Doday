import { ModuleObject, ModuleSysname, AppSpot } from '@doday/lib';
import { getView } from './views';

export const LayoutModuleObject: ModuleObject<AppSpot> = {
  status: {},
  config: {
    sysname: ModuleSysname.layout,
  },
  spots: [AppSpot.Default],
  getView,
};
