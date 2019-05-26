import { ActivityType } from '@root/lib/common-interfaces';
import {
  DodayBase,
  SerializedDodayBase,
  ProgressBase,
  APIResponseDodayBase,
  SerializedProgressBase,
  APIResponseProgressBase,
} from '@root/lib/models/entities/common';
import { Resource } from '@root/lib/models/entities/resource';
import { DodayLike, DodayType } from '@root/tools/types';

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

export const serializeActivity = (activity?: Activity): SerializedActivity => {
  if (!activity) return undefined;
  const { owner, progress, ...omitted } = activity;
  const serialized: SerializedActivity = {
    ...omitted,
    created: activity.created.getTime(),
  };

  return serialized;
};

export const deserializeActivity = (
  activity?: Partial<SerializedActivity>
): Partial<Activity> => {
  if (!activity) return undefined;
  const deserialized: Partial<Activity> = {
    ...activity,
    created: new Date(activity.created),
  };

  return deserialized;
};

export const serializeActivityProgress = (
  progress?: ActivityProgress
): SerializedActivityProgress => {
  if (!progress) return undefined;
  const convertedDates: any = {};
  if (progress.date) convertedDates.date = progress.date.getTime();
  if (progress.tookAt) convertedDates.tookAt = progress.tookAt.getTime();
  if (progress.completedAt)
    convertedDates.completedAt = progress.completedAt.getTime();
  const serialized: SerializedActivityProgress = {
    ...progress,
    ...convertedDates,
  };
  return serialized;
};

export const deserializeActivityProgress = (
  progress?: Partial<SerializedActivityProgress>
): ActivityProgress => {
  if (!progress) return undefined;
  const convertedDates: any = {};
  if (progress.date) convertedDates.date = new Date(progress.date);
  if (progress.tookAt) convertedDates.tookAt = new Date(progress.tookAt);
  if (progress.completedAt)
    convertedDates.completedAt = new Date(progress.completedAt);
  const deserialized: Partial<ActivityProgress> = {
    ...progress,
    ...convertedDates,
  };
  return deserialized;
};

export function isActivity(doday: DodayLike): doday is Activity {
  return doday.type === DodayType.Activity;
}
