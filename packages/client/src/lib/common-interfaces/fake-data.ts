import { Doday, SerializedDoday } from '../models/entities/Doday';
import { Goal, SerializedGoal } from '../models/entities/Goal';
import { DodayTypes } from '../models/entities/dodayTypes';

export const serializedDoday: SerializedDoday = {
  did: 'test did',
  activityType: 'do',
  type: DodayTypes.Doday,
  name: 'name',
  duration: 'P60M',
  public: false,
};

export const serializedGoal: SerializedGoal = {
  did: 'test did',
  type: DodayTypes.Goal,
  name: 'name',
  ownerDID: 'qweq12g3123guh',
  color: '#123j12',
  children: [],
};

export const doday: Doday = {
  did: 'test did',
  activityType: 'do',
  type: DodayTypes.Doday,
  name: 'name',
  duration: 'P60M',
  public: false,
};

export const goal: Goal = {
  did: 'test did',
  type: DodayTypes.Goal,
  name: 'name',
  ownerDID: 'qweq12g3123guh',
  color: '#123j12',
  children: [],
};
