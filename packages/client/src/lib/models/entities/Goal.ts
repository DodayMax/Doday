import { Doday } from './Doday';
import { DodayTypes } from './dodayTypes';

export interface Goal {
  did: string;
  type: DodayTypes.Goal;
  name: string;
  date?: Date;
  dodays: Doday[];
}

export interface SerializedGoal {
  did: string;
  type: number;
  name: string;
  date?: number;
  dodays?: string[];
}
