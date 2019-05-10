import { DodayTypes } from '../models/entities/common';
import {
  SerializedActivity,
  Activity,
  SerializedActivityProgress,
} from '../models/entities/Activity';

export const serializedActivity: SerializedActivity = {
  did: 'test did',
  activityType: 'do',
  type: DodayTypes.Activity,
  name: 'name',
  duration: 'P60M',
  public: false,
  owner: 'did',
  ownerDID: 'did',
};

export const partialProgress: Partial<SerializedActivityProgress> = {
  date: Date.now(),
  dateIsLocked: true,
};

export const activity: Activity = {
  did: 'test did',
  activityType: 'do',
  type: DodayTypes.Activity,
  name: 'name',
  duration: 'P60M',
  public: false,
  owner: {
    did: 'did',
    displayName: 'Test name',
    tools: [],
    created: new Date(),
  },
  ownerDID: 'did',
  created: new Date(),
};
