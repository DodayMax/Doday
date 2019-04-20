import { Hero, GraphQLResponseHero } from './Hero';
import { Tag } from './Tag';
import { DodayTypes } from './dodayTypes';
import { Resource, GraphQLResponseResource } from './Resource';
import {
  Activity,
  Neo4jResponseDate,
  Neo4jResponseDateTime,
} from '@root/lib/common-interfaces';
import { Goal } from './Goal';

export interface Doday {
  did: string;
  activityType: Activity;
  type: DodayTypes.Doday;
  name: string;
  duration: string;
  public: boolean;
  // Computed props by relations and from Progress node
  resource?: Resource;
  owner?: Hero;
  doing?: Hero[];
  done?: Hero[];
  tags?: Tag[];
  created?: Date;
  completed?: boolean;
  tookAt?: Date;
  date?: Date;
  dateIsLocked?: boolean;
  completedAt?: Date;
  relatedGoal?: Goal;
}

export interface SerializedDoday {
  did: string;
  activityType: Activity;
  type: number;
  name: string;
  duration: string;
  public: boolean;
  // Computed props by relations and from Progress node
  resource?: Resource;
  owner?: Hero;
  doing?: Hero[];
  done?: Hero[];
  tags?: string[];
  created?: number;
  completed?: boolean;
  tookAt?: number;
  date?: number;
  dateIsLocked?: boolean;
  completedAt?: number;
  relatedGoal?: string;
}

export interface APIResponseDoday {
  did: string;
  name: string;
  duration: string;
  type: number;
  activityType: Activity;
  tags?: string[];
  public: boolean;
  date: Neo4jResponseDate;
  dateIsLocked: boolean;
  completed: boolean;
  completedAt?: Neo4jResponseDateTime;
  tookAt: Neo4jResponseDateTime;
  relatedGoal?: {
    did: string;
    name: string;
    color: string;
  };
}

export interface GraphQLResponseDoday {
  did: string;
  activityType: string;
  type: number;
  name: string;
  duration: string;
  public: boolean;
  resource: GraphQLResponseResource[];
  owner: GraphQLResponseHero[];
  doing: GraphQLResponseHero[];
  done: GraphQLResponseHero[];
  created: number;
}
