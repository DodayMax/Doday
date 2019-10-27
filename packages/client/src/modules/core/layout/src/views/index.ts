import { ModuleView, AppSpot, GetViewParams } from '@doday/lib';
import { Layout } from './layout';
import { getLayoutModule } from '../redux';

export function getView(
  params: GetViewParams<AppSpot>
): ModuleView | undefined {
  switch (params.spot) {
    default:
      return {
        component: Layout,
        dependencies: [getLayoutModule()],
      };
  }
}
