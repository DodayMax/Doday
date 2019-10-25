import { NodeLabel, ModuleView, LayoutSpot, LayoutType } from '@doday/lib';
import { Layout } from './layout';
import { getLayoutModule } from '../duck';

export function getView(
  layoutType?: LayoutType,
  spot?: LayoutSpot,
  entity?: NodeLabel,
  node?: NodeLabel
): ModuleView | undefined {
  switch (spot) {
    default:
      return {
        component: Layout,
        dependencies: [getLayoutModule()],
      };
  }
}
