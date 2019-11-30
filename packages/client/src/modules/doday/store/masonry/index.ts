import { DodayModule, ModuleSysname, StoreSpot } from '@doday/lib';
import { StoreMasonry } from './view/store-masonry';
import { getStoreModule } from '@root/modules/redux/store';

const StoreMasonryDodayModule: DodayModule<StoreSpot.Masonry> = {
  status: {},
  config: {
    sysname: ModuleSysname.StoreMasonry,
    spot: StoreSpot.Masonry,
  },
  getView: () => ({
    component: StoreMasonry,
    dependencies: [getStoreModule()],
  }),
};

export default StoreMasonryDodayModule;
