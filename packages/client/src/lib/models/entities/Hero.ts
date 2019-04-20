import { GraphQLResponseDoday } from './Doday';

export interface Hero {
  did: string;
  nickname?: string;
  displayName: string;
  google?: string;
  vk?: string;
  github?: string;
}

export interface GraphQLResponseHero {
  did: string;
  nickname: string;
  displayName: string;
  google: string;
  friends: GraphQLResponseHero[];
  invitedByMe: GraphQLResponseHero[];
  createdDodays: GraphQLResponseDoday[];
  created: number;
}
