//reducers and sagas
import * as dodayapp from '@ducks/doday-app';
import * as dodayDetails from '@ducks/doday-details';
import * as payments from '@ducks/payments';
import * as builder from '@ducks/builder';
import * as auth from '@ducks/auth';
import * as herosettings from '@ducks/hero-settings';
import * as api from '@ducks/api';
import { tools } from '@tools';

const ducks: any = {
  dodayapp,
  dodayDetails,
  builder,
  auth,
  herosettings,
  payments,
  api,
};

tools.map(tool => {
  if (tool.duck) ducks[tool.config.name.toLowerCase()] = tool.duck;
});

export default ducks;
