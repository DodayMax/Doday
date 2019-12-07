import { DodayModule, ModuleSysname, DrawerSpot } from '@doday/lib';
import { StoreDrawerMenuItem } from './view/drawer-item';
import { getStoreModule } from '@root/modules/redux/store';

const StoreDrawerMenuItemDodayModule: DodayModule<DrawerSpot.ToolItem> = {
  status: {},
  config: {
    sysname: ModuleSysname.StoreDrawerItem,
    spot: DrawerSpot.ToolItem,
  },
  getView: () => ({
    component: StoreDrawerMenuItem,
    dependencies: [getStoreModule()],
  }),
};

export default StoreDrawerMenuItemDodayModule;
