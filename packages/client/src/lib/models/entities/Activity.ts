import { Resource, GraphQLResponseResource } from './resource';
import { ActivityTypes } from '@root/lib/common-interfaces';
import { Hero } from './hero';
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

export interface Activity extends DodayBase {
  /** Activity type of the doday based on Resource */
  activityType: ActivityTypes;
  /** Doday name */
  name: string;
  /** Description */
  description?: string;
  /** Preview image url */
  image?: string;
  /** Duration of the doday */
  duration?: string;
  /** CYPHER query for Heroes with active Progress node */
  doing?: Hero[];
  /** CYPHER query for Heroes with completed Progress node */
  done?: Hero[];
  /** Tags related to doday */
  tags?: Tag[];
  /** [:RESOURCE] relation */
  resource?: Resource;
  /** Attached flash cards */
  memos?: FlashCard[];
}

export interface SerializedActivity
  extends SerializedDodayBase,
    SerializedActivityProgress {
  activityType: ActivityTypes;
  name: string;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
  resource?: Resource;
  memos?: string[];
}

export interface APIResponseActivity extends APIResponseDodayBase {
  activityType: ActivityTypes;
  name: string;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
  memos?: APIResponseFlashCard[];
}

export interface GraphQLResponseActivity extends GraphQLResponseDodayBase {
  activityType: ActivityTypes;
  name: string;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
  resource: GraphQLResponseResource[];
  memos?: GraphQLResponseFlashCard[];
}

export interface ActivityProgress extends ProgressBase {}

export interface SerializedActivityProgress extends SerializedProgressBase {}

export interface APIresponseActivityProgress extends APIResponseProgressBase {}

export interface GraphQLResponseActivityProgress
  extends GraphQLResponseProgressBase {}
