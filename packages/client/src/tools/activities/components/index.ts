import ActivityDodayApp from './doday-app/doday-app';
import ActivityBuilder from './builders/activity-builder';
import ActivityDetails from './details/activity-details';
import ActivityProgressDetails from './details/progress-details';
import { ActivityCell } from './doday-app/cells/app-cell/activity-cell';
import { ActivityProgressCell } from './doday-app/cells/app-cell/activity-progress-cell';
import { DodayTypes } from '@root/lib/models/entities/common';

export const components = {
  dodayApp: ActivityDodayApp,
  cells: {
    public: ActivityCell,
    progress: ActivityProgressCell,
  },
  builders: { [DodayTypes.Activity]: ActivityBuilder },
  details: {
    public: ActivityDetails,
    progress: ActivityProgressDetails,
  },
};
