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
      switch (true) {
        case params.route.path === BASE_ROUTES.profile:
          return {
            component: Profile,
            dependencies: [],
          };
      }
  }
}
