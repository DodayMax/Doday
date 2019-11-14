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
  BaseStackSpot,
} from '@doday/lib';
import { ActivitiesDrawerMenuItem } from './desktop-drawer-menu-item/desktop-drawer-menu-item';
import { MobileActivitiesApp, ActivitiesApp } from './activities-app';
import { ActivitySpeedDialItem } from './speed-dial-item/activity-speed-dial-item';
import { MobileActivitiesDrawerMenuItem } from './mobile-drawer-menu-item/mobile-drawer-menu-item';
import { ActivityBuilder } from './activity-builder/activity-builder';
import { ActivityDetails } from './activity-details/activity-details';
import { ActivityCard } from './activity-card/activity-card';
import { ActivityToolStoreCard } from './activity-tool-store-card/activity-tool-store-card';
import { ActivityToolDetails } from './activity-tool-details/activity-tool-details';
import { ActivityProgressDetails } from './activity-progress-details/activity-progress-details';

export function getView(params: GetViewParams): ModuleView | undefined {
  switch (params.spot) {
    case LayoutSpot.Sidebar:
      return {
        component: ActivitiesApp,
        dependencies: [],
      };
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
      if (params.layoutType === LayoutType.Mobile) {
        return {
          component: MobileActivitiesApp,
          dependencies: [],
        };
      }
      break;
    case StoreSpot.Card:
      switch (params.node) {
        case NodeLabel.Activity:
          return {
            component: ActivityCard,
            dependencies: [],
          };
        case NodeLabel.Tool:
          return {
            component: ActivityToolStoreCard,
            dependencies: [],
          };
      }
      break;
    case BaseStackSpot.Builder:
      switch (params.node) {
        case NodeLabel.Activity:
          return {
            component: ActivityBuilder,
            dependencies: [],
          };
      }
    case BaseStackSpot.Details:
      switch (params.node) {
        case NodeLabel.Activity:
          return {
            component: ActivityDetails,
            dependencies: [],
          };
      }
    case BaseStackSpot.Progress:
      switch (params.node) {
        case NodeLabel.ActivityProgress:
          return {
            component: ActivityProgressDetails,
            dependencies: [],
          };
      }
  }
}
