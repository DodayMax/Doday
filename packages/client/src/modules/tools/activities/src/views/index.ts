import {
  ModuleView,
  GetViewParams,
  BASE_ROUTES,
  DrawerSpot,
  LayoutSpot,
  LayoutType,
  NavigationSpot,
} from '@doday/lib';
import { ActivitiesDrawerMenuItem } from './drawer-menu-item/drawer-menu-item';
import { ActivitiesApp } from './activities-app/activities-app';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case DrawerSpot.ToolItem:
      switch (params.route) {
        default:
          return {
            component: ActivitiesDrawerMenuItem,
            dependencies: [],
          };
      }
    case LayoutSpot.Sidebar:
      switch (params.route) {
        case BASE_ROUTES.activities:
          return {
            component: ActivitiesApp,
            dependencies: [],
          };
      }
    case NavigationSpot.BaseRoute:
      switch (params.route) {
        case BASE_ROUTES.activities:
          if (params.layoutType === LayoutType.Mobile) {
            return {
              component: ActivitiesApp,
              dependencies: [],
            };
          }
      }
  }
}
