import { DodayModule, ModuleSysname, AppSpot } from '@doday/lib';
import { DodayDialog } from './view/dialog';
import { getDialogModule } from '@root/modules/redux/dialog';

const DialogDodayModule: DodayModule<AppSpot.Dialog> = {
  status: {},
  config: {
    sysname: ModuleSysname.Dialog,
    spot: AppSpot.Dialog,
  },
  getView: () => ({
    component: DodayDialog,
    dependencies: [getDialogModule()],
  }),
};

export default DialogDodayModule;
