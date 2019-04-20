import { Doday } from './Doday';
import { DodayTypes } from './dodayTypes';
import { Neo4jDate } from '@root/lib/common-interfaces';
import { GraphQLResponseProgress } from './Progress';

export interface Goal {
  did: string;
  type: DodayTypes.Goal;
  name: string;
  ownerDID: string;
  color: string;
  startDate?: Date;
  endDate?: Date;
  children?: Doday[];
}

export interface SerializedGoal {
  did: string;
  type: number;
  name: string;
  ownerDID: string;
  color: string;
  startDate?: number;
  endDate?: number;
  children?: string[];
}

export interface GraphQLResponseGoal {
  did: string;
  type: number;
  name: string;
  color: string;
  startDate: Neo4jDate;
  endDate: Neo4jDate;
  ownerDID: string;
  children: GraphQLResponseProgress[];
}
