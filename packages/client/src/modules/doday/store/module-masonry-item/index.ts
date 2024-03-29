import { DodayModule, ModuleSysname, StoreSpot, NodeLabel } from '@doday/lib';
import { ModuleMasonryItem } from './view/module-masonry-item';
import { getStoreModule } from '@root/modules/redux/store';

const ModuleMasonryItemDodayModule: DodayModule<StoreSpot.MasonryItem> = {
  status: {},
  config: {
    sysname: ModuleSysname.StoreModuleMasonryItem,
    spot: StoreSpot.MasonryItem,
    node: NodeLabel.Module,
  },
  getView: () => ({
    component: ModuleMasonryItem,
    dependencies: [getStoreModule()],
  }),
};

export default ModuleMasonryItemDodayModule;
