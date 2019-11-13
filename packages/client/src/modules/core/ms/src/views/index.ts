import {
  GetViewParams,
  ModuleView,
  StoreSpot,
  NodeLabel,
  NavigationSpot,
} from '@doday/lib';
import { ModuleCard } from './module-card/module-card';
import { routes } from '../routes';
import { ModuleDetails } from './module-details/module-details';

export function getView(params: GetViewParams): ModuleView | undefined {
  console.log(params);
  switch (params.spot) {
    case StoreSpot.Card:
      switch (params.node) {
        case NodeLabel.Module:
          return {
            component: ModuleCard,
            dependencies: [],
          };
      }
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
