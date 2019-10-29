import { ModuleView, GetViewParams, AppSpot } from '@doday/lib';
import { getToastModule } from '../redux';
import { Snackbar } from './snackbar/snackbar';

export function getView(
  params: GetViewParams<AppSpot.Toast>
): ModuleView | undefined {
  switch (params.spot) {
    case AppSpot.Toast:
      return {
        component: Snackbar,
        dependencies: [getToastModule()],
      };
  }
}
