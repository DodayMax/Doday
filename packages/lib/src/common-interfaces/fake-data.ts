// import { activeToolsForHero } from '../utils';
// import { initialStatusState } from '@root/ducks/doday-app/reducer';
// import { initialDodayDetailsState } from '@root/ducks/doday-details/reducer';
// import { initialBuilderStatusState } from '@root/ducks/builder/reducer';
// import { initialHeroSettingsState } from '@root/ducks/hero-settings/reducer';
// import { initialStoreState } from '@root/ducks/store/reducer';
import { Token } from 'react-stripe-checkout';
// import { initialDialogState } from '@root/ducks/dialog/reducer';
import { RootState, NodeLabel, Hero } from '../models';

export const hero: Hero = {
  did: 'test did',
  labels: [NodeLabel.Hero],
  name: 'Tester',
  public: true,
  createdAt: new Date(),
};

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
    status: {},
    isAuthenticated: false,
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
  layout: {} as any,
  activities: {},
  store: {} as any,
  toast: {
    open: false,
    type: 'success',
    messages: [],
    autoHideDuration: 3000,
  },
  dialog: {} as any,
  navigation: {
    base: '/',
    stack: [],
  },
  ms: {
    modules: {},
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
