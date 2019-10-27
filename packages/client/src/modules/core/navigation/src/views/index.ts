import { ModuleView, LayoutSpot, GetViewParams } from '@doday/lib';
import { getNavigationModule } from '../redux';
import { NavigationStack } from './navigation-stack/navigation-stack';

export function getView(
  params: GetViewParams<LayoutSpot.Page>
): ModuleView | undefined {
  switch (params.spot) {
    case LayoutSpot.Page:
      return {
        component: NavigationStack,
        dependencies: [getNavigationModule()],
      };
  }
}
