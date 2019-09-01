import { ActivityDodayApp } from './doday-app/doday-app';
import { ActivityBuilder } from './builders/activity-builder';
import { ActivityDetails } from './details/activity-details';
import { ActivityProgressDetails } from './details/progress-details';
import { ActivityCell } from './doday-app/cells/app-cell/activity-cell';
import { ActivityProgressCell } from './doday-app/cells/app-cell/activity-progress-cell';
import { ActivityOverview } from './overview/overview';
import { DodayType } from '@doday/lib';

export const components: any = {
  dodayApp: ActivityDodayApp,
  cells: {
    [DodayType.Activity]: {
      public: ActivityCell,
      progress: ActivityProgressCell,
    },
  },
  builders: { [DodayType.Activity]: ActivityBuilder },
  details: {
    [DodayType.Activity]: {
      public: ActivityDetails,
      progress: ActivityProgressDetails,
    },
  },
  overview: ActivityOverview,
};
