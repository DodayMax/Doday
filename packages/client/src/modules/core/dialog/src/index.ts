import { ModuleObject, ModuleSysname, AppSpot, ModuleType } from '@doday/lib';
import { getView } from './views';

export const DialogModuleObject: ModuleObject<AppSpot.Dialog> = {
  status: {},
  config: {
    sysname: ModuleSysname.Dialog,
    type: ModuleType.Core,
  },
  spots: [AppSpot.Dialog],
  getView,
};
