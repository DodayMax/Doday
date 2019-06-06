import {
  DodayBase,
  SerializedDodayBase,
  ProgressBase,
  SerializedProgressBase,
  Entity,
  DodayLike,
  DodayType,
} from '@root/lib/models/entities/common';
import { Resource } from '@root/lib/models/entities/resource';

/**
 * Main entity type used for operating in App
 */
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
  /** Public doday's rate */
  rate?: number;
  /** [:RESOURCE] relation */
  resource?: Resource;
  /** Progress node for this Doday */
  progress?: ActivityProgress;
}

/**
 * Serialized types used for communicate with API
 */
export interface SerializedActivity extends SerializedDodayBase {
  activityType: ActivityType;
  name: string;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
}

/**
 * Progress type describe Progress node for Activity
 * more about data model of the Doday app - https://github.com/dodayio/doday-pwa/wiki/Data-model-in-graph-database
 */
export interface ActivityProgress extends ProgressBase {
  pinned?: boolean;
}

/**
 * Serialized progress node
 */
export interface SerializedActivityProgress extends SerializedProgressBase {}

/**
 * Type of Activity
 */
export type ActivityType = 'do' | 'read' | 'watch';

/**
 * Each Entity has own serialization,
 * deserialization methods for both Entity and Progress nodes
 * and method for check type of the Entity - isActivity(someEntity)
 */

export const serializeActivity = (
  activity?: Partial<Activity>
): Partial<SerializedActivity> => {
  if (!activity) return undefined;
  const { owner, progress, ...omitted } = activity;
  const serialized: Partial<SerializedActivity> = {
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
  progress?: Partial<ActivityProgress>
): Partial<SerializedActivityProgress> => {
  if (!progress) return undefined;
  const convertedDates: any = {};
  if (progress.date) convertedDates.date = progress.date.getTime();
  if (progress.tookAt) convertedDates.tookAt = progress.tookAt.getTime();
  if (progress.completedAt)
    convertedDates.completedAt = progress.completedAt.getTime();
  const serialized: Partial<SerializedActivityProgress> = {
    ...progress,
    ...convertedDates,
  };
  return serialized;
};

export const deserializeActivityProgress = (
  progress?: Partial<SerializedActivityProgress>
): Partial<ActivityProgress> => {
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

/**
 * Finally, you need to export Entity object
 */
export const ActivityEntity: Entity = {
  type: DodayType.Activity,
  name: 'activity',
  serialize: serializeActivity,
  deserialize: deserializeActivity,
  serializeProgress: serializeActivityProgress,
  deserializeProgress: deserializeActivityProgress,
  isActivity,
};