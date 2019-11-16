import {
  GetViewParams,
  ModuleView,
  StoreSpot,
  NodeLabel,
  BaseStackSpot,
} from '@doday/lib';
import { ModuleStoreCard } from './module-store-card/module-store-card';
import { ModuleDetails } from './module-details/module-details';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case StoreSpot.Card:
      switch (params.node) {
        case NodeLabel.Tool:
          return {
            component: ModuleStoreCard,
            dependencies: [],
          };
      }
      break;
    case BaseStackSpot.Details:
      switch (params.node) {
        case NodeLabel.Tool:
          return {
            component: ModuleDetails,
            dependencies: [],
          };
      }
      break;
  }
}
