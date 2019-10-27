import { ModuleObject, ModuleSysname, LayoutSpot } from '@doday/lib';
import { getView } from './views';
import { en, ru } from './translations';

export const TopbarModuleObject: ModuleObject<LayoutSpot.TopBar> = {
  status: {},
  config: {
    sysname: ModuleSysname.topbar,
  },
  spots: [LayoutSpot.TopBar],
  translations: {
    en,
    ru,
  },
  getView,
};
