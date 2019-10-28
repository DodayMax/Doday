import {
  ModuleObject,
  ModuleSysname,
  NavigationSpot,
  BASE_ROUTES,
} from '@doday/lib';
import { getView } from './views';
import { en, ru } from './translations';

export const ProfileModuleObject: ModuleObject<NavigationSpot.BaseRoute> = {
  status: {},
  config: {
    sysname: ModuleSysname.Profile,
  },
  spots: [NavigationSpot.BaseRoute],
  routes: [BASE_ROUTES.profile],
  translations: {
    en,
    ru,
  },
  getView,
};
