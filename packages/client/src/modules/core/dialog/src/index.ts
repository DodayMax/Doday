import { ModuleObject, ModuleSysname, AppSpot } from '@doday/lib';
import { getView } from './views';

export const DialogModuleObject: ModuleObject<AppSpot.Dialog> = {
  status: {},
  config: {
    sysname: ModuleSysname.Dialog,
  },
  spots: [AppSpot.Dialog],
  getView,
};
