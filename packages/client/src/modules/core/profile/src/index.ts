import {
  ModuleObject,
  ModuleSysname,
  NavigationSpot,
  TopbarSpot,
} from '@doday/lib';
import { getView } from './views';
import { en, ru } from './translations';

export const ProfileModuleObject: ModuleObject<NavigationSpot.BaseRoute> = {
  status: {},
  config: {
    sysname: ModuleSysname.Profile,
  },
  spots: [NavigationSpot.BaseRoute],
  translations: {
    en,
    ru,
  },
  getView,
};
