import { Doday } from '../models/entities/Doday';
import { Goal } from '../models/entities/Goal';
import { DodayTypes } from '../models/entities/dodayTypes';

export const testDoday: Doday = {
  did: 'test did',
  activityType: 'do',
  type: DodayTypes.Doday,
  name: 'name',
  public: false,
};

export const testGoal: Goal = {
  did: 'test did',
  type: DodayTypes.Goal,
  name: 'name',
  ownerDID: 'qweq12g3123guh',
  color: '#123j12',
  children: [],
};
