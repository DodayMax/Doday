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
