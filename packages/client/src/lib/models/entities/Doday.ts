import { Hero } from './Hero';
import { Tag } from './Tag';
import { DodayTypes } from './dodayTypes';

export interface Progress {
  origin: SerializedDoday;
  completed: boolean;
  date?: number;
  tookAt?: number;
  completedAt?: number;
}

export interface Doday {
  did: string;
  type: DodayTypes.Doday;
  name: string;
  public: boolean;
  // Computed props by relations and from Progress node
  owner?: Hero;
  doing?: [Hero];
  done?: [Hero];
  tags?: [Tag];
  created?: Date;
  completed?: boolean;
  tookAt?: Date;
  date?: Date;
  completedAt?: Date;
}

export interface SerializedDoday {
  did: string;
  type: number;
  name: string;
  public: boolean;
  // Computed props by relations and from Progress node
  owner?: Hero;
  doing?: [Hero];
  done?: [Hero];
  tags?: [Tag];
  created?: number;
}
