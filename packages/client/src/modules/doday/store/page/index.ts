import { DodayModule, ModuleSysname, NavigationSpot } from '@doday/lib';
import { DodayStore } from './view/store';
import { getStoreModule } from '@root/modules/redux/store';
import { en, ru } from './translations';
import { routes } from './routes';

const StorePageDodayModule: DodayModule<NavigationSpot.BaseRoute> = {
  status: {},
  config: {
    sysname: ModuleSysname.Store,
    spot: NavigationSpot.BaseRoute,
  },
  getView: () => ({
    component: DodayStore,
    dependencies: [getStoreModule()],
  }),
  provided: {
    routes: Object.values(routes),
  },
  translations: {
    en,
    ru,
  },
};

export default StorePageDodayModule;
