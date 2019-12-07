import { DodayModule, ModuleSysname, AppSpot } from '@doday/lib';
import { Layout } from './view/layout';
import { getLayoutModule } from '@root/modules/redux/layout';

const LayoutDodayModule: DodayModule<AppSpot.Default> = {
  status: {},
  config: {
    sysname: ModuleSysname.Layout,
    spot: AppSpot.Default,
  },
  getView: () => ({
    component: Layout,
    dependencies: [getLayoutModule()],
  }),
};

export default LayoutDodayModule;
