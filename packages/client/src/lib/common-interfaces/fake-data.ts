import { DodayType } from '@root/tools/types';
import {
  SerializedActivity,
  SerializedActivityProgress,
  Activity,
} from '@root/tools/activity/entities/activity';
import { Hero } from '../models/entities/hero';
import { RootState } from '../models';
import { activeToolsForHero } from '../utils';
import { initialStatusState } from '@root/ducks/doday-app/reducer';
import { initialDodayDetailsState } from '@root/ducks/doday-details/reducer';
import { initialBuilderStatusState } from '@root/ducks/builder/reducer';
import { initialHeroSettingsState } from '@root/ducks/hero-settings/reducer';
import { initialStoreState } from '@root/ducks/store/reducer';

export const hero: Hero = {
  did: 'test did',
  displayName: 'Tester',
  tools: ['activities', 'schedule'],
  created: new Date('2019-02-15'),
};

export const serializedActivity: SerializedActivity = {
  did: 'test did',
  activityType: 'do',
  type: DodayType.Activity,
  name: 'name',
  duration: 'P60M',
  public: false,
  ownerDID: 'did',
};

export const partialProgress: Partial<SerializedActivityProgress> = {
  date: Date.now(),
  dateIsLocked: true,
};

export const activity: Activity = {
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
    created: new Date('2019-02-15'),
  },
  ownerDID: 'did',
  created: new Date('2019-02-15'),
};

export const rootState: RootState = {
  auth: {
    hero,
    activeTools: activeToolsForHero(hero),
  },
  dodayApp: {
    status: initialStatusState,
  },
  dodayDetails: initialDodayDetailsState,
  builder: {
    status: initialBuilderStatusState,
    tools: {},
  },
  heroSettings: initialHeroSettingsState,
  tools: {},
  store: initialStoreState,
};
