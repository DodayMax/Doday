import { Resource } from './resource';
import {
  DodayBase,
  SerializedDodayBase,
  APIResponseDodayBase,
  ProgressBase,
  SerializedProgressBase,
  APIResponseProgressBase,
} from './common';
import { ActivityType } from '@root/lib/common-interfaces';

export interface Activity extends DodayBase {
  /** Activity type of the doday based on Resource */
  activityType: ActivityType;
  /** Doday name */
  name: string;
  /** Description */
  description?: string;
  /** Preview image url */
  image?: string;
  /** Duration of the doday */
  duration?: string;
  /** Tags related to doday */
  tags?: string[];
  /** [:RESOURCE] relation */
  resource?: Resource;
}

export interface SerializedActivity extends SerializedDodayBase {
  activityType: ActivityType;
  name: string;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
}

export interface APIResponseActivity extends APIResponseDodayBase {
  activityType: ActivityType;
  name: string;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
}

export interface ActivityProgress extends ProgressBase {}

export interface SerializedActivityProgress extends SerializedProgressBase {}

export interface APIresponseActivityProgress extends APIResponseProgressBase {}

export const serializeActivity = (activity: Activity): SerializedActivity => {
  const { owner, progress, ...omitted } = activity;
  const serialized: SerializedActivity = {
    ...omitted,
    created: activity.created.getTime(),
  };

  return serialized;
};

export const deserializeActivity = (activity: SerializedActivity): Activity => {
  const deserialized: Activity = {
    ...activity,
    created: new Date(activity.created),
  };

  return deserialized;
};

export const serializeActivityProgress = (
  progress: ActivityProgress
): SerializedActivityProgress => {
  const serialized: SerializedActivityProgress = {
    ...progress,
    date: progress.date && progress.date.getTime(),
    tookAt: progress.tookAt && progress.tookAt.getTime(),
    completedAt: progress.completedAt && progress.completedAt.getTime(),
  };
  return serialized;
};

export const deserializeActivityProgress = (
  progress: SerializedActivityProgress
): ActivityProgress => {
  const deserialized: ActivityProgress = {
    ...progress,
    date: progress.date && new Date(progress.date),
    tookAt: progress.tookAt && new Date(progress.tookAt),
    completedAt: progress.completedAt && new Date(progress.completedAt),
  };
  return deserialized;
};
