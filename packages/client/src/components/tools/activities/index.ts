import { ActivityCell } from './app-cell/activity-cell';
import { ActivityProgressCell } from './app-cell/activity-progress-cell';
import { ActivityBuilder } from './builder/activity-builder';
import ActivityDetails from './details/activity-details';
import ActivityProgressDetails from './details/progress-details';
import {
  DodayAppPaths,
  DodayToolBeaconNames,
} from '@root/lib/common-interfaces';
import { IconNames } from '@root/components/shared/_atoms/icons';

export const activityBeacon: ToolBeacon = {
  name: 'Activities',
  icon: 'Activities',
  path: 'activities',
  entityCell: ActivityCell,
  progressCell: ActivityProgressCell,
  builder: ActivityBuilder,
  entityDetails: ActivityDetails,
  progressDetails: ActivityProgressDetails,
};

export interface ToolBeacon {
  name: DodayToolBeaconNames;
  icon: IconNames;
  path: DodayAppPaths;
  entityCell: React.ReactNode;
  progressCell: React.ReactNode;
  builder: React.ReactNode;
  entityDetails: React.ReactNode;
  progressDetails: React.ReactNode;
}
