//reducers and sagas
import dodayapp from './doday-app';
import dodayDetails from './doday-details';
import builder from './builder';
import auth from './auth';
import herosettings from './hero-settings';
import api from './api';
import store from './store';
import toast from './toast';
import dialog from './dialog';

export * from './api';
export * from './auth';
export * from './builder';
export * from './dialog';
export * from './doday-app';
export * from './doday-details';
export * from './hero-settings';
export * from './store';
export * from './toast';

const ducks: any = {
  dodayapp,
  dodayDetails,
  builder,
  auth,
  herosettings,
  api,
  store,
  toast,
  dialog,
};

export default ducks;
