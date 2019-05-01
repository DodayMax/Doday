import {
  Activity,
  GraphQLResponseActivity,
  ActivityProgress,
  SerializedActivity,
} from './activity';
import { Hero, GraphQLResponseHero, APIResponseHero } from './Hero';
import {
  Neo4jDateTime,
  Neo4jResponseDateTime,
} from '@root/lib/common-interfaces';
import {
  FlashCard,
  GraphQLResponseFlashCard,
  FlashCardProgress,
  SerializedFlashCard,
} from './flash-card';

/** Doday base abstract interface */

export interface DodayBase {
  /** Doday inner ID */
  did: string;
  /** Doday type */
  type: DodayTypes;
  /** Public or private doday */
  public: boolean;
  /** [:CREATE] relation */
  owner: Hero;
  /** Owner DID for graphQL queries */
  ownerDID: string;
  /** Datetime when doday was created */
  created: Date;
}

export interface SerializedDodayBase {
  did: string;
  type: number;
  public: boolean;
  owner: string;
  ownerDID: string;
  created?: number;
}

export interface APIResponseDodayBase {
  did: string;
  type: number;
  public: boolean;
  owner: APIResponseHero;
  ownerDID: string;
  created?: number;
}

export interface GraphQLResponseDodayBase {
  did: string;
  type: number;
  public: boolean;
  created?: Neo4jDateTime;
  owner: GraphQLResponseHero;
  ownerDID: string;
  doing: GraphQLResponseHero[];
  done: GraphQLResponseHero[];
}

/** Progress base abstract interface */

export interface ProgressBase {
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
  origin: DodayLike;
}

/** Which data we send to API */
export interface SerializedProgressBase {
  completed?: boolean;
  tookAt?: number;
  date?: number;
  dateIsLocked?: boolean;
  completedAt?: number;
  origin?: string;
}

export interface APIResponseProgressBase {
  did: string;
  date: Neo4jResponseDateTime;
  dateIsLocked: boolean;
  completed: boolean;
  completedAt?: Neo4jResponseDateTime;
  tookAt: Neo4jResponseDateTime;
  origin: string;
}

export interface GraphQLResponseProgressBase {
  did: string;
  completed: boolean;
  tookAt: Neo4jDateTime;
  date: Neo4jDateTime;
  dateIsLocked: boolean;
  completedAt?: Neo4jDateTime;
  hero: GraphQLResponseHero[];
  origin: DodayLikeGraphQLResponse[];
}

/** Other common interfaces */

export enum DodayTypes {
  Activity,
  Goal,
  Path,
}

export type DodayLike = Activity | FlashCard;

export type DodayLikeGraphQLResponse =
  | GraphQLResponseActivity
  | GraphQLResponseFlashCard;

export type DodayLikeSerialized = SerializedActivity | SerializedFlashCard;
export type DodayLikeProgress = ActivityProgress | FlashCardProgress;
