import { ActivityDodayApp } from './doday-app/doday-app';
import { ActivityBuilder } from './builders/activity-builder';
import { ActivityDetails } from './details/activity-details';
import { ActivityProgressDetails } from './details/progress-details';
import { ActivityCell } from './doday-app/cells/app-cell/activity-cell';
import { ActivityProgressCell } from './doday-app/cells/app-cell/activity-progress-cell';
import { ActivityOverview } from './overview/overview';
import { DodayType } from '@doday/lib';
import {
  getActivitiesMainModule,
  getActivitiesBuilderModule,
} from '../modules';

export const components: any = {
  app: {
    component: ActivityDodayApp,
    dependencies: [getActivitiesMainModule()],
    cells: {
      [DodayType.Activity]: {
        public: ActivityCell,
        progress: ActivityProgressCell,
      },
    },
  },
  builder: {
    [DodayType.Activity]: {
      component: ActivityBuilder,
      dependencies: [getActivitiesBuilderModule()],
    },
  },
  detail: {
    [DodayType.Activity]: {
      public: {
        component: ActivityDetails,
        dependencies: [],
      },
      progress: {
        component: ActivityProgressDetails,
        dependencies: [],
      },
    },
  },
  overview: {
    component: ActivityOverview,
    dependencies: [],
  },
};
