import {
  ModuleObject,
  ModuleSysname,
  NavigationSpot,
  BASE_ROUTES,
  ModuleType,
  TopbarSpot,
} from '@doday/lib';
import { getView } from './views';
import { en, ru } from './translations';

export const StoreModuleObject: ModuleObject<
  NavigationSpot.BaseRoute | TopbarSpot.NavItem
> = {
  status: {},
  config: {
    sysname: ModuleSysname.Store,
    type: ModuleType.Core,
  },
  spots: [NavigationSpot.BaseRoute, TopbarSpot.NavItem],
  routes: [BASE_ROUTES.store],
  translations: {
    en,
    ru,
  },
  getView,
};
