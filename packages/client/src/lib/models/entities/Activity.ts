import { Resource, GraphQLResponseResource } from './resource';
import { Hero, parseGraphQLResponseHero } from './hero';
import {
  DodayBase,
  SerializedDodayBase,
  GraphQLResponseDodayBase,
  APIResponseDodayBase,
  ProgressBase,
  SerializedProgressBase,
  APIResponseProgressBase,
  GraphQLResponseProgressBase,
} from './common';
import { Tag } from './tag';
import {
  FlashCard,
  APIResponseFlashCard,
  GraphQLResponseFlashCard,
} from './flash-card';
import { ActivityType } from '@root/lib/common-interfaces';
import {
  firstItem,
  dateFromNeo4jDateTime,
  dateFromNeo4jDate,
} from '@root/lib/utils';

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
  /** Attached flash cards */
  memos?: GraphQLResponseFlashCard[];
}

export interface SerializedActivity extends SerializedDodayBase {
  activityType: ActivityType;
  name: string;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
  resource?: Resource;
  memos?: string[];
}

export interface APIResponseActivity extends APIResponseDodayBase {
  activityType: ActivityType;
  name: string;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
  memos?: APIResponseFlashCard[];
}

export interface GraphQLResponseActivity extends GraphQLResponseDodayBase {
  activityType: ActivityType;
  name: string;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
  resource: GraphQLResponseResource[];
  memos: GraphQLResponseFlashCard[];
}

export interface ActivityProgress extends ProgressBase {}

export interface SerializedActivityProgress extends SerializedProgressBase {}

export interface APIresponseActivityProgress extends APIResponseProgressBase {}

export interface GraphQLResponseActivityProgress
  extends GraphQLResponseProgressBase {}

/** Utils to parse Responses => Entities */

export function parseGraphQLResponseActivityProgress(
  progress: GraphQLResponseActivityProgress
): ActivityProgress {
  const origin: GraphQLResponseActivity =
    progress.origin && firstItem(progress.origin);
  const originActivity: Activity = {
    ...origin,
    resource: firstItem(origin.resource),
    owner: parseGraphQLResponseHero(firstItem(origin.owner)),
    created: dateFromNeo4jDateTime(origin.created),
  };
  return {
    ...progress,
    tookAt: progress.tookAt && dateFromNeo4jDateTime(progress.tookAt),
    date: progress.date && dateFromNeo4jDate(progress.date),
    completedAt:
      progress.completedAt && dateFromNeo4jDate(progress.completedAt),
    origin: originActivity,
  };
}
