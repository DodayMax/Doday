import { ModuleView, TopbarSpot, GetViewParams } from '@doday/lib';
import { SignButtons } from './sign-buttons/sign-buttons';
import { getAuthenticationModule } from '../redux';

export function getView(
  params: GetViewParams<TopbarSpot.Right>
): ModuleView | undefined {
  switch (params.spot) {
    case TopbarSpot.Right:
      return {
        component: SignButtons,
        dependencies: [getAuthenticationModule()],
      };
  }
}
