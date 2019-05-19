//reducers and sagas
import * as dodayapp from '@ducks/doday-app';
import * as dodayDetails from '@ducks/doday-details';
import * as payments from '@ducks/payments';
import * as builder from '@ducks/builder';
import * as auth from '@ducks/auth';
import * as herosettings from '@ducks/hero-settings';
import * as api from '@ducks/api';
import * as store from '@ducks/store';
import { toolBeacons } from '@tools';

const ducks: any = {
  dodayapp,
  dodayDetails,
  builder,
  auth,
  herosettings,
  payments,
  api,
  store,
};

toolBeacons.map(tool => {
  if (tool.duck) ducks[tool.config.sysname] = tool.duck;
});

export default ducks;
