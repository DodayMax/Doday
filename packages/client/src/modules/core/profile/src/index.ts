import {
  ModuleObject,
  ModuleSysname,
  NavigationSpot,
  ModuleType,
} from '@doday/lib';
import { getView } from './views';
import { en, ru } from './translations';
import { routes } from './routes';

export const ProfileModuleObject: ModuleObject<NavigationSpot.BaseRoute> = {
  status: {},
  config: {
    sysname: ModuleSysname.Profile,
    type: ModuleType.Core,
  },
  spots: [NavigationSpot.BaseRoute],
  translations: {
    en,
    ru,
  },
  getView,
  provided: {
    routes: Object.values(routes),
  },
};
