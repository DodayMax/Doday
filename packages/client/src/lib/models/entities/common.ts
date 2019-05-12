import {
  Activity,
  ActivityProgress,
  SerializedActivity,
  SerializedActivityProgress,
  APIresponseActivityProgress,
} from './activity';
import { Hero, APIResponseHero } from './hero';
import { Neo4jResponseDateTime } from '@root/lib/common-interfaces';
import {
  FlashCard,
  FlashCardProgress,
  SerializedFlashCard,
  SerializedFlashCardProgress,
  APIresponseFlashCardProgress,
} from './flash-card';

/** Doday base abstract interface */

export interface DodayBase {
  /** Doday inner ID */
  did: string;
  /** Doday type */
  type: DodayType;
  /** Public or private doday */
  public: boolean;
  /** Owner DID for graphQL queries */
  ownerDID: string;
  /** Datetime when doday was created */
  created: Date;
  /** [:CREATE] relation */
  owner?: Hero;
  /** Progress node for this Doday */
  progress?: ProgressBase;
}

export interface SerializedDodayBase {
  did: string;
  type: number;
  public: boolean;
  ownerDID: string;
  created?: number;
}

export interface APIResponseDodayBase {
  did: string;
  type: number;
  public: boolean;
  ownerDID: string;
  owner?: APIResponseHero;
  created?: number;
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
}

/** Which data we send to API */
export interface SerializedProgressBase {
  completed?: boolean;
  tookAt?: number;
  date?: number;
  dateIsLocked?: boolean;
  completedAt?: number;
  ownerDID?: string;
}

export interface APIResponseProgressBase {
  date: Neo4jResponseDateTime;
  dateIsLocked: boolean;
  completed: boolean;
  completedAt?: Neo4jResponseDateTime;
  tookAt: Neo4jResponseDateTime;
}

/** Other common interfaces */

export enum DodayType {
  Activity,
  FlashCard,
}

export type DodayLike = Activity | FlashCard;
export type SerializedDodayLike = SerializedActivity | SerializedFlashCard;
export type ProgressLike = ActivityProgress | FlashCardProgress;
export type SerializedProgressLike =
  | SerializedActivityProgress
  | SerializedFlashCardProgress;
export type APIResponseProgressLike =
  | APIresponseActivityProgress
  | APIresponseFlashCardProgress;
