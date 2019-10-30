import {
  ModuleObject,
  ModuleSysname,
  NavigationSpot,
  BASE_ROUTES,
  ModuleType,
} from '@doday/lib';
import { getView } from './views';
import { en, ru } from './translations';

export const ProfileModuleObject: ModuleObject<NavigationSpot.BaseRoute> = {
  status: {},
  config: {
    sysname: ModuleSysname.Profile,
    type: ModuleType.Core,
  },
  spots: [NavigationSpot.BaseRoute],
  routes: [BASE_ROUTES.profile],
  translations: {
    en,
    ru,
  },
  getView,
};
