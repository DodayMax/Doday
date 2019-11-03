import {
  ModuleObject,
  ModuleSysname,
  NavigationSpot,
  ModuleType,
  TopbarSpot,
} from '@doday/lib';
import { getView } from './views';
import { en, ru } from './translations';
import { routes } from './routes';

export const StoreModuleObject: ModuleObject<
  NavigationSpot.BaseRoute | TopbarSpot.NavItem
> = {
  status: {},
  config: {
    sysname: ModuleSysname.Store,
    type: ModuleType.Core,
  },
  spots: [NavigationSpot.BaseRoute, TopbarSpot.NavItem],
  routes,
  translations: {
    en,
    ru,
  },
  getView,
};
