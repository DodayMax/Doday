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
  friends: GraphQLResponseHero[];
  invitedByMe: GraphQLResponseHero[];
  createdDodays: DodayLikeGraphQLResponse[];
  created: number;
}
