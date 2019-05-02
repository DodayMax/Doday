import { DodayLikeGraphQLResponse } from './common';

export interface Hero {
  did: string;
  nickname?: string;
  displayName: string;
  google?: string;
  created: Date;
}

export interface APIResponseHero {
  did: string;
  nickname?: string;
  displayName: string;
  google?: string;
  created: number;
}

export interface GraphQLResponseHero {
  did: string;
  nickname?: string;
  displayName: string;
  google?: string;
  created: number;
}

/** Utils to parse Responses => Entities */

export function parseGraphQLResponseHero(response: GraphQLResponseHero): Hero {
  return {
    ...response,
    created: new Date(response.created),
  };
}
