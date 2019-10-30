import {
  ModuleView,
  GetViewParams,
  BASE_ROUTES,
  DrawerSpot,
  LayoutSpot,
  LayoutType,
  NavigationSpot,
  NodeLabel,
  SpeedDialSpot,
} from '@doday/lib';
import { ActivitiesDrawerMenuItem } from './desktop-drawer-menu-item/desktop-drawer-menu-item';
import { ActivitiesApp } from './activities-app/activities-app';
import { ActivitySpeedDialItem } from './speed-dial-item/activity-speed-dial-item';
import { MobileActivitiesDrawerMenuItem } from './mobile-drawer-menu-item/mobile-drawer-menu-item';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case LayoutSpot.Sidebar:
      switch (params.route) {
        case BASE_ROUTES.activities:
          return {
            component: ActivitiesApp,
            dependencies: [],
          };
        default:
          return null;
      }
    case DrawerSpot.ToolItem:
      switch (params.layoutType) {
        case LayoutType.Desktop:
          return {
            component: ActivitiesDrawerMenuItem,
            dependencies: [],
          };
        case LayoutType.Mobile:
          return {
            component: MobileActivitiesDrawerMenuItem,
            dependencies: [],
          };
      }
    case SpeedDialSpot.Item:
      switch (params.node) {
        case NodeLabel.Activity:
          return {
            component: ActivitySpeedDialItem,
            dependencies: [],
          };
        default:
          return null;
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
        default:
          return null;
      }
    // case NavigationSpot.StackedRoute:
    //   switch (true) {
    //     case params.route.startsWith(STACKED_ROUTES.builder):
    //       switch (params.label) {
    //         case NodeLabel.Activity:
    //       }
    //   }
  }
}
