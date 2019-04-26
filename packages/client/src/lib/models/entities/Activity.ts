import { Doday, SerializedDoday, GraphQLResponseDoday } from './Doday';
import { Resource, GraphQLResponseResource } from './Resource';
import { ActivityTypes } from '@root/lib/common-interfaces';
import { GraphQLResponseHero } from './Hero';

export interface Activity extends Doday {
  /** Activity type of the doday */
  activityType: ActivityTypes;
  /** [:RESOURCE] relation */
  resource?: Resource;
}

export interface SerializedActivity extends SerializedDoday {
  activityType: ActivityTypes;
  resource?: Resource;
}

export interface APIResponseActivity extends SerializedDoday {
  activityType: ActivityTypes;
}

export interface GraphQLResponseActivity extends GraphQLResponseDoday {
  activityType: ActivityTypes;
  resource: GraphQLResponseResource[];
  owner: GraphQLResponseHero[];
  doing: GraphQLResponseHero[];
  done: GraphQLResponseHero[];
}
