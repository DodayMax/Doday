import { NodeLabel, ModuleView, TopbarSpot, LayoutType } from '@doday/lib';
import { SignButtons } from './sign-buttons/sign-buttons';
import { getAuthenticationModule } from '../redux';

export function getView(
  layoutType?: LayoutType,
  spot?: TopbarSpot.Right,
  entity?: NodeLabel,
  node?: NodeLabel
): ModuleView | undefined {
  switch (spot) {
    case TopbarSpot.Right:
      return {
        component: SignButtons,
        dependencies: [getAuthenticationModule()],
      };
  }
}
