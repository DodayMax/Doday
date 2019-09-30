import { Hero } from '../models/entities/hero';
// import { activeToolsForHero } from '../utils';
// import { initialStatusState } from '@root/ducks/doday-app/reducer';
// import { initialDodayDetailsState } from '@root/ducks/doday-details/reducer';
// import { initialBuilderStatusState } from '@root/ducks/builder/reducer';
// import { initialHeroSettingsState } from '@root/ducks/hero-settings/reducer';
// import { initialStoreState } from '@root/ducks/store/reducer';
import { Token } from 'react-stripe-checkout';
import { Resource, SerializedResource } from '../models/entities/resource';
// import { initialDialogState } from '@root/ducks/dialog/reducer';
import {
  SerializedActivity,
  Activity,
  SerializedActivityProgress,
  ActivityProgress,
} from '../models/entities/activity';
import { DodayType, DodayLike, ProgressLike } from '../models/entities/common';
import { RootState } from '../models';

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
  created: new Date('2019-02-15').getTime(),
};

export const deserializedActivity: Activity = {
  did: 'test did',
  activityType: 'do',
  type: DodayType.Activity,
  name: 'name',
  duration: 'P60M',
  public: false,
  ownerDID: 'did',
  created: new Date('2019-02-15'),
};

export const serializedActivityProgress: SerializedActivityProgress = {
  date: new Date('2019-02-15').getTime(),
  tookAt: new Date('2019-02-15').getTime(),
  completedAt: new Date('2019-02-15').getTime(),
};

export const deserialzedActivityProgress: ActivityProgress = {
  date: new Date('2019-02-15'),
  tookAt: new Date('2019-02-15'),
  completedAt: new Date('2019-02-15'),
};

export const partialProgress: Partial<ActivityProgress> = {
  date: new Date('2019-02-15'),
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
  progress: {
    date: new Date('2019-02-15'),
    completed: false,
    dateIsLocked: false,
    pinned: false,
    ownerDID: 'test hero did',
  },
};

export const doday: DodayLike = {
  did: 'test did',
  activityType: 'do',
  type: DodayType.Activity,
  name: 'name',
  duration: 'P60M',
  public: false,
  ownerDID: 'did',
  created: new Date('2019-02-15'),
};

export const progress: ProgressLike = {
  date: new Date('2019-02-15'),
  completed: false,
  ownerDID: 'test hero did',
};

export const deserializedResource: Resource = {
  did: 'did',
  description: 'string',
  icon: 'string',
  image: 'string',
  keywords: ['string'],
  provider: 'string',
  title: 'string',
  type: 'string',
  url: 'string',
};

export const serializedResource: SerializedResource = deserializedResource;

export const rootState: RootState = {
  router: {
    location: {
      pathname: 'Pathname',
      search: 'Search',
      state: '',
      hash: '',
    },
    action: 'POP',
  },
  auth: {
    hero,
    activeTools: {},
  },
  sidebar: {
    loading: false,
    route: '',
    routeParams: {},
    badge: 0,
  },
  details: {} as any,
  builder: {
    status: {} as any,
    tools: {},
  },
  heroSettings: {} as any,
  activities: {},
  store: {} as any,
  toast: {
    open: false,
    type: 'success',
    messages: [],
    autoHideDuration: 3000,
  },
  dialog: {} as any,
  navStack: {
    base: '/',
    stack: [],
  },
};

export const stripeToken: Token = {
  id: 'id',
  object: 'some object',
  card: {
    id: 'string',
    object: 'string',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: null,
    address_zip_check: null,
    brand: 'string',
    country: 'string',
    cvc_check: 'string',
    dynamic_last4: null,
    exp_month: 0,
    exp_year: 0,
    funding: 'string',
    last4: 'string',
    metadata: {},
    name: 'string',
    tokenization_method: null,
  },
  client_ip: 'string',
  created: 0,
  email: 'string',
  livemode: false,
  type: 'string',
  used: false,
};
