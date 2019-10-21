import { ActivitySidebar } from './sidebar/sidebar';
import { ActivityBuilder } from './builders/activity-builder';
import { ActivityDetails } from './details/activity-details';
import { ActivityProgressDetails } from './details/progress-details';
import { ActivityCell } from './sidebar/cells/app-cell/activity-cell';
import { ActivityProgressCell } from './sidebar/cells/app-cell/activity-progress-cell';
import { ActivityOverview } from './overview/overview';
import { LayoutSpot, NodeLabel, ToolView } from '@doday/lib';
import { getActivitiesMainModule, getActivitiesBuilderModule } from '../duck';

export const getView = (
  spot: LayoutSpot,
  entity: NodeLabel,
  node?: NodeLabel
): ToolView | undefined => {
  switch (spot) {
    case LayoutSpot.drawer:
      return;
    case LayoutSpot.sidebar:
      return {
        component: ActivitySidebar,
        dependencies: [getActivitiesMainModule()],
      };
    case LayoutSpot.cell:
      switch (entity) {
        case NodeLabel.Activity:
          switch (node) {
            case NodeLabel.Progress:
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
        case NodeLabel.Activity:
          return {
            component: ActivityBuilder,
            dependencies: [getActivitiesBuilderModule()],
          };
        default:
          return undefined;
      }
    case LayoutSpot.details:
      switch (entity) {
        case NodeLabel.Activity:
          switch (node) {
            case NodeLabel.Progress:
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
