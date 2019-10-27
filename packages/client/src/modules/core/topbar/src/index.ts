import { ModuleObject, ModuleSysname, LayoutSpot } from '@doday/lib';
import { getView } from './views';

export const TopbarModuleObject: ModuleObject<LayoutSpot.TopBar> = {
  status: {},
  config: {
    sysname: ModuleSysname.Topbar,
  },
  spots: [LayoutSpot.TopBar],
  getView,
};
