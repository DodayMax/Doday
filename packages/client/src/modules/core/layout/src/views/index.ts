import { NodeLabel, ModuleView, AppSpot, LayoutType } from '@doday/lib';
import { Layout } from './layout';
import { getLayoutModule } from '../duck';

export function getView(
  layoutType?: LayoutType,
  spot?: AppSpot,
  entity?: NodeLabel
): ModuleView | undefined {
  switch (spot) {
    default:
      return {
        component: Layout,
        dependencies: [getLayoutModule()],
      };
  }
}
