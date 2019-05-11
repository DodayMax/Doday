import ActivityDodayApp from './doday-app/doday-app';
import ActivityBuilder from './builders/activity-builder';
import ActivityDetails from './details/activity-details';
import ActivityProgressDetails from './details/progress-details';
import { ActivityCell } from './doday-app/cells/app-cell/activity-cell';
import { ActivityProgressCell } from './doday-app/cells/app-cell/activity-progress-cell';
import { DodayTypes } from '@root/lib/models/entities/common';
import { ActivityOverview } from './overview/overview';

export const components = {
  dodayApp: ActivityDodayApp,
  cells: {
    [DodayTypes.Activity]: {
      public: ActivityCell,
      progress: ActivityProgressCell,
    },
  },
  builders: { [DodayTypes.Activity]: ActivityBuilder },
  details: {
    [DodayTypes.Activity]: {
      public: ActivityDetails,
      progress: ActivityProgressDetails,
    },
  },
  overview: ActivityOverview,
};
