import { ModuleView, GetViewParams, NavigationSpot } from '@doday/lib';
import { Profile } from './profile/profile';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case NavigationSpot.BaseRoute:
      return {
        component: Profile,
        dependencies: [],
      };
  }
}
