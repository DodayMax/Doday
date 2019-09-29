//reducers and sagas
import sidebar from './sidebar';
import details from './doday-details';
import builder from './builder';
import auth from './auth';
import settings from './hero-settings';
import api from './api';
import store from './store';
import toast from './toast';
import dialog from './dialog';

export * from './api';
export * from './auth';
export * from './builder';
export * from './dialog';
export * from './sidebar';
export * from './doday-details';
export * from './hero-settings';
export * from './store';
export * from './toast';

export * from './all-selectors';

const ducks: any = {
  sidebar,
  details,
  builder,
  auth,
  settings,
  api,
  store,
  toast,
  dialog,
};

export default ducks;
