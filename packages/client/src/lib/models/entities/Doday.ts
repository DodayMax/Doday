import { Hero } from './Hero';
import { Tag } from './Tag';
import { DodayTypes } from './dodayTypes';
import { Neo4jDateTime } from '@root/lib/common-interfaces';

/** Main abstract interface */
export interface Doday {
  /** Doday inner ID */
  did: string;
  /** Doday type */
  type: DodayTypes;
  /** Doday name */
  name: string;
  /** Public or private doday */
  public: boolean;
  /** [:CREATE] relation */
  owner: Hero;
  /** Owner DID for graphQL queries */
  ownerDID: string;
  /** Datetime when doday was created */
  created: Date;
  /** Description */
  description?: string;
  /** Preview image url */
  image?: string;
  /** Duration of the doday */
  duration?: string;
  /** CYPHER query for Heroes with active Progress node */
  doing?: Hero[];
  /** CYPHER query for Heroes with completed Progress node */
  done?: Hero[];
  /** Tags related to doday */
  tags?: Tag[];
}

/** Which data we send to API */
export interface SerializedDoday {
  did: string;
  type: number;
  name: string;
  public: boolean;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
  created?: number;
  ownerDID: string;
}

export interface GraphQLResponseDoday {
  did: string;
  type: number;
  name: string;
  public: boolean;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
  created?: Neo4jDateTime;
  ownerDID: string;
}
