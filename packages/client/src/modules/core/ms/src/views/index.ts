import { GetViewParams, ModuleView, NavigationSpot } from '@doday/lib';
import { routes } from '../routes';
import { ModuleDetails } from './module-details/module-details';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case NavigationSpot.StackedRoute:
      switch (true) {
        case params.route && routes.details.pattern.test(params.route.url):
          return {
            component: ModuleDetails,
            dependencies: [],
          };
      }
  }
}
