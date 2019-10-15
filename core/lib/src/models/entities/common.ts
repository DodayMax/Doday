import { APIResponseHero } from './hero';
import {
  Activity,
  SerializedActivity,
  ActivityProgress,
  SerializedActivityProgress,
} from './activity';
import { Neo4jResponseDateTime } from '../../common-interfaces';
import { NodeType } from '../nodes';

/**
 * Entity object for using it in Tools
 */
export interface Entity {
  type: NodeType;
  name: string;
  /**
   * Since you may want to serialize or deserialize only a
   * a part of the `Entity`, for example for `update doday`
   * we use `Partial`
   */
  serialize?: (
    doday: Partial<DodayLike>
  ) => Partial<SerializedDodayLike> | undefined;
  deserialize?: (
    doday: Partial<SerializedDodayLike>
  ) => Partial<DodayLike> | undefined;
  serializeProgress?: (
    progress: Partial<ProgressLike>
  ) => Partial<SerializedProgressLike> | undefined;
  deserializeProgress?: (
    progress: Partial<SerializedDodayLike>
  ) => Partial<ProgressLike> | undefined;
  isEntity: (doday: DodayLike) => boolean;
}

export type DodayLike = Activity;
export type SerializedDodayLike = SerializedActivity;
export type ProgressLike = ActivityProgress;
export type SerializedProgressLike = SerializedActivityProgress;

/** Doday base abstract interface */

export interface DodayBase {
  /** Doday inner ID */
  did: string;
  /** Doday type */
  type: NodeType;
  /** Public or private doday */
  public: boolean;
  /** Owner DID for graphQL queries */
  ownerDID: string;
  /** Datetime when doday was created */
  created: Date;
}

export interface SerializedDodayBase {
  did: string;
  type: NodeType;
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
  /** Owner DID to filter by owner */
  ownerDID?: string;
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
