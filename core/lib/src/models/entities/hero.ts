import { ToolSysname } from './tools';

export interface Hero {
  did: string;
  tools: ToolSysname[];
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
