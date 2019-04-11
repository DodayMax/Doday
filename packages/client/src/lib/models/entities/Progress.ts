import { Hero } from './Hero';
import { Doday } from './Doday';
import { Neo4jDateTime, Neo4jDate } from '@root/lib/common-interfaces/neo4j';

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
