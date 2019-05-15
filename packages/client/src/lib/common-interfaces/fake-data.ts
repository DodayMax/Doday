import { DodayType } from '@root/tools/types';

export const serializedActivity = {
  did: 'test did',
  activityType: 'do',
  type: DodayType.Activity,
  name: 'name',
  duration: 'P60M',
  public: false,
  ownerDID: 'did',
};

export const partialProgress = {
  date: Date.now(),
  dateIsLocked: true,
};

export const activity = {
  did: 'test did',
  activityType: 'do',
  type: DodayType.Activity,
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
