import {
  ModuleView,
  GetViewParams,
  DrawerSpot,
  LayoutSpot,
  LayoutType,
  NavigationSpot,
  NodeLabel,
  SpeedDialSpot,
  StoreSpot,
  SIDEBAR_ROUTES,
} from '@doday/lib';
import { ActivitiesDrawerMenuItem } from './desktop-drawer-menu-item/desktop-drawer-menu-item';
import { MobileActivitiesApp, ActivitiesApp } from './activities-app';
import { ActivitySpeedDialItem } from './speed-dial-item/activity-speed-dial-item';
import { MobileActivitiesDrawerMenuItem } from './mobile-drawer-menu-item/mobile-drawer-menu-item';
import { ActivityBuilder } from './activity-builder/activity-builder';
import { routes } from '../routes';
import { ActivityDetails } from './activity-details/activity-details';
import { ActivityCard } from './activity-card/activity-card';
import { ActivityModuleCard } from './module-card/module-card';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case LayoutSpot.Sidebar:
      switch (true) {
        case params.route && params.route.path === SIDEBAR_ROUTES.activities:
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
      switch (true) {
        case params.route && params.route.path === SIDEBAR_ROUTES.activities:
          if (params.layoutType === LayoutType.Mobile) {
            return {
              component: MobileActivitiesApp,
              dependencies: [],
            };
          }
        default:
          return null;
      }
    case NavigationSpot.StackedRoute:
      switch (true) {
        case params.route && routes.builder.pattern.test(params.route.url):
          return {
            component: ActivityBuilder,
            dependencies: [],
          };
        case params.route && routes.details.pattern.test(params.route.url):
          return {
            component: ActivityDetails,
            dependencies: [],
          };
      }
    case StoreSpot.Card:
      switch (params.node) {
        case NodeLabel.Activity:
          return {
            component: ActivityCard,
            dependencies: [],
          };
        case NodeLabel.Module:
          return {
            component: ActivityModuleCard,
            dependencies: [],
          };
      }
  }
}
