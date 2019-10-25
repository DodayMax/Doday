import { ModuleObject, ModuleSysname } from '@doday/lib';
import { getView } from './views';

export const LayoutModuleObject: ModuleObject = {
  status: {},
  config: {
    sysname: ModuleSysname.layout,
  },
  getView,
};
