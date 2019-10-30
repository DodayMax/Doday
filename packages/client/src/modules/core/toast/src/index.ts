import { ModuleObject, ModuleSysname, AppSpot, ModuleType } from '@doday/lib';
import { getView } from './views';

export const ToastModuleObject: ModuleObject<AppSpot.Toast> = {
  status: {},
  config: {
    sysname: ModuleSysname.Toast,
    type: ModuleType.Core,
  },
  spots: [AppSpot.Toast],
  getView,
};
