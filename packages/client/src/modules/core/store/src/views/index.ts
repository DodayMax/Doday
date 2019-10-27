import {
  ModuleView,
  GetViewParams,
  NavigationSpot,
  BASE_ROUTES,
} from '@doday/lib';
import { DodayStore } from './store/store';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case NavigationSpot.BaseRoute:
      switch (params.route) {
        case BASE_ROUTES.store:
          return {
            component: DodayStore,
            dependencies: [],
          };
      }
  }
}
