import { Hero } from './Hero';
import { Tag } from './Tag';
import { DodayTypes } from './dodayTypes';
import { Resource } from './Resource';
import { Activity } from '@root/lib/common-interfaces';

export interface Doday {
  did: string;
  activityType: Activity;
  type: DodayTypes.Doday;
  name: string;
  public: boolean;
  // Computed props by relations and from Progress node
  resource?: Resource;
  owner?: Hero;
  doing?: Hero[];
  done?: Hero[];
  tags?: Tag[];
  created?: Date;
  completed?: boolean;
  tookAt?: Date;
  date?: Date;
  completedAt?: Date;
}

export interface SerializedDoday {
  did: string;
  activityType: Activity;
  type: number;
  name: string;
  public: boolean;
  // Computed props by relations and from Progress node
  resource?: Resource;
  date?: number;
  owner?: Hero;
  doing?: Hero[];
  done?: Hero[];
  tags?: string[];
  created?: number;
}
