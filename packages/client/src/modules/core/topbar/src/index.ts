import {
  ModuleObject,
  ModuleSysname,
  LayoutSpot,
  ModuleType,
} from '@doday/lib';
import { getView } from './views';

export const TopbarModuleObject: ModuleObject<LayoutSpot.TopBar> = {
  status: {},
  config: {
    sysname: ModuleSysname.Topbar,
    type: ModuleType.Core,
  },
  spots: [LayoutSpot.TopBar],
  getView,
};
