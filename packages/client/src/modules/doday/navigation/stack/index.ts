import { DodayModule, LayoutSpot, ModuleSysname } from '@doday/lib';
import { NavigationStack } from './navigation-stack';
import { getNavigationModule } from '@redux/navigation';

export const NavigationStackDodayModule: DodayModule<LayoutSpot.Page> = {
  status: {},
  config: {
    sysname: ModuleSysname.NavigationStack,
    spot: LayoutSpot.Page,
  },
  getView: () => ({
    component: NavigationStack,
    dependencies: [getNavigationModule()],
  }),
};
