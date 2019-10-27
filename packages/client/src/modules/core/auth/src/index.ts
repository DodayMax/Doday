import { ModuleObject, ModuleSysname, TopbarSpot } from '@doday/lib';
import { getView } from './views';
import { en, ru } from './translations';

export const AuthModuleObject: ModuleObject<TopbarSpot.Right> = {
  status: {},
  config: {
    sysname: ModuleSysname.auth,
  },
  spots: [TopbarSpot.Right],
  translations: {
    en,
    ru,
  },
  getView,
};
