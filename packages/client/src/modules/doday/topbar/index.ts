import { DodayModule, ModuleSysname, LayoutSpot } from '@doday/lib';
import { Topbar } from './view/topbar';

const TopbarDodayModule: DodayModule<LayoutSpot.TopBar> = {
  status: {},
  config: {
    sysname: ModuleSysname.Topbar,
    spot: LayoutSpot.TopBar,
  },
  getView: () => ({
    component: Topbar,
    dependencies: [],
  }),
};

export default TopbarDodayModule;
