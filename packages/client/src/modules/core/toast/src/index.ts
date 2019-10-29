import { ModuleObject, ModuleSysname, AppSpot } from '@doday/lib';
import { getView } from './views';

export const ToastModuleObject: ModuleObject<AppSpot.Toast> = {
  status: {},
  config: {
    sysname: ModuleSysname.Toast,
  },
  spots: [AppSpot.Toast],
  getView,
};
