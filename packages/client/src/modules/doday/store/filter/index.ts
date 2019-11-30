import { DodayModule, ModuleSysname, StoreSpot } from '@doday/lib';
import { StoreFilter } from './view/store-filter';
import { getStoreModule } from '@root/modules/redux/store';

const StoreFilterDodayModule: DodayModule<StoreSpot.Filter> = {
  status: {},
  config: {
    sysname: ModuleSysname.StoreFilter,
    spot: StoreSpot.Filter,
  },
  getView: () => ({
    component: StoreFilter,
    dependencies: [getStoreModule()],
  }),
};

export default StoreFilterDodayModule;
