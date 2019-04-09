import { Hero } from './Hero';
import { Doday } from './Doday';

/**
 * When we fetch doday with graphQL, we actually
 * fetch Progress node and it looks like this
 */

export interface SerializedProgress {
  did: string;
  completed: boolean;
  tookAt: Neo4jDateTime;
  date: Neo4jDate;
  completedAt: Neo4jDateTime;
  hero: Hero[];
  origin: Doday[];
}

export interface Neo4jDate {
  year: number;
  month: number;
  day: number;
  formatted?: string;
}

export interface Neo4jDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second?: number;
  millisecond?: number;
  microsecond?: number;
  nanosecond?: number;
  timezone?: string;
  formatted?: string;
}
