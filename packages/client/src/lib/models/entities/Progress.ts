import { GraphQLResponseHero } from './Hero';
import { GraphQLResponseDoday, Doday } from './Doday';
import {
  Neo4jDateTime,
  Neo4jDate,
  Neo4jResponseDateTime,
} from '@root/lib/common-interfaces/neo4j';
import { GraphQLResponseGoal, Goal } from './Goal';

/**
 * When Hero take Doday - Progress node is created
 */

export interface Progress {
  /** Completed Doday or not */
  completed?: boolean;
  /** Datetime when Hero take Doday */
  tookAt?: Date;
  /** Datetime for Doday */
  date?: Date;
  /** Don't change Doday's date when plan out Dodays */
  dateIsLocked?: boolean;
  /** Datetime when Doday is completed */
  completedAt?: Date;
  /** Actual Doday node for this Progress */
  doday?: Doday;
  /** Related Goal node for this Progress */
  relatedGoal?: Goal;
}

/** Which data we send to API */
export interface SerializedProgress {
  completed?: boolean;
  tookAt?: number;
  date?: number;
  dateIsLocked?: boolean;
  completedAt?: number;
  relatedGoal?: string;
}

export interface APIResponseProgress {
  did: string;
  date: Neo4jResponseDateTime;
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

export interface GraphQLResponseProgress {
  did: string;
  completed: boolean;
  tookAt: Neo4jDateTime;
  date: Neo4jDate;
  dateIsLocked: boolean;
  completedAt?: Neo4jDateTime;
  hero: GraphQLResponseHero[];
  doday: GraphQLResponseDoday[];
  relatedGoal?: GraphQLResponseGoal[];
}
