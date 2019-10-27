import {
  ModuleView,
  GetViewParams,
  NavigationSpot,
  BASE_ROUTES,
} from '@doday/lib';
import { Profile } from './profile/profile';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case NavigationSpot.BaseRoute:
      switch (params.route) {
        case BASE_ROUTES.profile:
          return {
            component: Profile,
            dependencies: [],
          };
      }
  }
}
