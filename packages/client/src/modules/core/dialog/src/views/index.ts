import { ModuleView, GetViewParams, AppSpot } from '@doday/lib';
import { getDialogModule } from '../redux';
import { DodayDialog } from './dialog/dialog';

export function getView(
  params: GetViewParams<AppSpot.Dialog>
): ModuleView | undefined {
  switch (params.spot) {
    case AppSpot.Dialog:
      return {
        component: DodayDialog,
        dependencies: [getDialogModule()],
      };
  }
}
