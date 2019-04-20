import { Hero, GraphQLResponseHero } from './Hero';
import { Doday, GraphQLResponseDoday } from './Doday';
import { Neo4jDateTime, Neo4jDate } from '@root/lib/common-interfaces/neo4j';
import { GraphQLResponseGoal } from './Goal';

/**
 * When we fetch doday with graphQL, we actually
 * fetch Progress node and it looks like this
 */

export interface GraphQLResponseProgress {
  did: string;
  completed: boolean;
  tookAt: Neo4jDateTime;
  date: Neo4jDate;
  dateIsLocked: boolean;
  completedAt?: Neo4jDateTime;
  hero: GraphQLResponseHero[];
  origin: GraphQLResponseDoday[];
  relatedGoal?: GraphQLResponseGoal[];
}
