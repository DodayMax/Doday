import { ModuleView, GetViewParams, StoreSpot } from '@doday/lib';
import { StoreGrid } from './store-grid/store-grid';
import { getStoreGridModule } from '../redux';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case StoreSpot.Grid:
      return {
        component: StoreGrid,
        dependencies: [getStoreGridModule()],
      };
  }
}
