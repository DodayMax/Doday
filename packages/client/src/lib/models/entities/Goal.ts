import { Doday } from './Doday';
import { DodayTypes } from './dodayTypes';

export interface Goal {
  did: string;
  type: DodayTypes.Goal;
  name: string;
  ownerDID: string;
  color: string;
  startDate?: Date;
  endDate?: Date;
  children?: Doday[];
}

export interface SerializedGoal {
  did: string;
  type: number;
  name: string;
  ownerDID: string;
  color: string;
  startDate?: number;
  endDate?: number;
  children?: string[];
}
