import { DodayModule, ModuleSysname, AppSpot } from '@doday/lib';
import { Snackbar } from './view/snackbar';
import { getToastModule } from '@root/modules/redux/toast';

const ToastDodayModule: DodayModule<AppSpot.Toast> = {
  status: {},
  config: {
    sysname: ModuleSysname.Toast,
    spot: AppSpot.Toast,
  },
  getView: () => ({
    component: Snackbar,
    dependencies: [getToastModule()],
  }),
};

export default ToastDodayModule;
