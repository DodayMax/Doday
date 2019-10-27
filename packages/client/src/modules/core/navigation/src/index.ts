import { ModuleObject, ModuleSysname, LayoutSpot } from '@doday/lib';
import { getView } from './views';

export const NavigationModuleObject: ModuleObject<LayoutSpot.Page> = {
  status: {},
  config: {
    sysname: ModuleSysname.Navigation,
  },
  spots: [LayoutSpot.Page],
  getView,
};
