import { ModuleObject, ModuleSysname } from '@doday/lib';
import { getModuleSystemModule } from './duck';

export const LayoutModuleObject: ModuleObject = {
  status: {},
  config: {
    sysname: ModuleSysname.ms,
  },
  getReduxModule: () => getModuleSystemModule(),
};
