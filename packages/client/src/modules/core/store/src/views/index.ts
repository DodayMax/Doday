import {
  ModuleView,
  GetViewParams,
  NavigationSpot,
  BASE_ROUTES,
  DrawerSpot,
  LayoutType,
} from '@doday/lib';
import { DodayStore } from './store/store';
import { routes } from '../routes';
import { StoreDrawerMenuItem } from './store-drawer-item/store-drawer-item';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case DrawerSpot.ToolItem:
      switch (params.layoutType) {
        case LayoutType.Desktop:
          return {
            component: StoreDrawerMenuItem,
            dependencies: [],
          };
        case LayoutType.Mobile:
          return {
            component: StoreDrawerMenuItem,
            dependencies: [],
          };
      }
    case NavigationSpot.BaseRoute:
      switch (true) {
        case routes.store.pattern.test(params.route.path):
          return {
            component: DodayStore,
            dependencies: [],
          };
      }
  }
}
