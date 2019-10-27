import { ModuleObject, ModuleSysname, NavigationSpot } from '@doday/lib';
import { getView } from './views';
import { en, ru } from './translations';

export const StoreModuleObject: ModuleObject<NavigationSpot.BaseRoute> = {
  status: {},
  config: {
    sysname: ModuleSysname.Store,
  },
  spots: [NavigationSpot.BaseRoute],
  translations: {
    en,
    ru,
  },
  getView,
};
