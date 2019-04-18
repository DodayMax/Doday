import { Hero } from './Hero';
import { Tag } from './Tag';
import { DodayTypes } from './dodayTypes';
import { Resource } from './Resource';
import { Activity } from '@root/lib/common-interfaces';
import { Goal } from './Goal';

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
  dateIsLocked?: boolean;
  completedAt?: Date;
  relatedGoal?: Goal;
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
  dateIsLocked?: boolean;
  owner?: Hero;
  doing?: Hero[];
  done?: Hero[];
  tags?: string[];
  created?: number;
  relatedGoal?: string;
}
