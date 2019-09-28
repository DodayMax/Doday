import { ActivityDodayApp } from './doday-app/doday-app';
import { ActivityBuilder } from './builders/activity-builder';
import { ActivityDetails } from './details/activity-details';
import { ActivityProgressDetails } from './details/progress-details';
import { ActivityCell } from './doday-app/cells/app-cell/activity-cell';
import { ActivityProgressCell } from './doday-app/cells/app-cell/activity-progress-cell';
import { ActivityOverview } from './overview/overview';
import { DodayType, LayoutSpot, NodeType, ToolView } from '@doday/lib';
import {
  getActivitiesMainModule,
  getActivitiesBuilderModule,
} from '../modules';

export const getView = (
  spot: LayoutSpot,
  entity: DodayType,
  node?: NodeType
): ToolView | undefined => {
  switch (spot) {
    case LayoutSpot.drawer:
      return;
    case LayoutSpot.sidebar:
      return {
        component: ActivityDodayApp,
        dependencies: [getActivitiesMainModule()],
      };
    case LayoutSpot.cell:
      switch (entity) {
        case DodayType.Activity:
          switch (node) {
            case NodeType.progress:
              return {
                component: ActivityProgressCell,
                dependencies: [],
              };
            default:
              return {
                component: ActivityCell,
                dependencies: [],
              };
          }
      }
    case LayoutSpot.builder:
      switch (entity) {
        case DodayType.Activity:
          return {
            component: ActivityBuilder,
            dependencies: [getActivitiesBuilderModule()],
          };
        default:
          return undefined;
      }
    case LayoutSpot.details:
      switch (entity) {
        case DodayType.Activity:
          switch (node) {
            case NodeType.progress:
              return {
                component: ActivityProgressDetails,
                dependencies: [],
              };
            default:
              return {
                component: ActivityDetails,
                dependencies: [],
              };
          }
        default:
          return undefined;
      }
    case LayoutSpot.overview:
      return {
        component: ActivityOverview,
        dependencies: [],
      };
    default:
      return undefined;
  }
};
