import {
  ModuleObject,
  ModuleSysname,
  NavigationSpot,
  BASE_ROUTES,
} from '@doday/lib';
import { getView } from './views';
import { en, ru } from './translations';

export const StoreModuleObject: ModuleObject<NavigationSpot.BaseRoute> = {
  status: {},
  config: {
    sysname: ModuleSysname.Store,
  },
  spots: [NavigationSpot.BaseRoute],
  routes: [BASE_ROUTES.store],
  translations: {
    en,
    ru,
  },
  getView,
};
