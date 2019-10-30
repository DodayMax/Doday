import {
  ModuleObject,
  ModuleSysname,
  TopbarSpot,
  ModuleType,
} from '@doday/lib';
import { getView } from './views';
import { en, ru } from './translations';

export const AuthModuleObject: ModuleObject<TopbarSpot.Right> = {
  status: {},
  config: {
    sysname: ModuleSysname.Auth,
    type: ModuleType.Core,
  },
  spots: [TopbarSpot.Right],
  translations: {
    en,
    ru,
  },
  getView,
};
