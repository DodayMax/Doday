import {
  ModuleObject,
  ModuleSysname,
  LayoutSpot,
  ModuleType,
} from '@doday/lib';
import { getView } from './views';

export const NavigationModuleObject: ModuleObject<LayoutSpot.Page> = {
  status: {},
  config: {
    sysname: ModuleSysname.Navigation,
    type: ModuleType.Core,
  },
  spots: [LayoutSpot.Page],
  getView,
};
