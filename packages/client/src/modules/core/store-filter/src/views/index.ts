import { ModuleView, GetViewParams, StoreSpot } from '@doday/lib';
import { StoreFilter } from './store-filter';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case StoreSpot.Filter:
      return {
        component: StoreFilter,
        dependencies: [],
      };
  }
}
