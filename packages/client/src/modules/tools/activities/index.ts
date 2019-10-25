import * as duck from './duck';
import { config } from './config';
import { en } from './translations/en';
import { RootState } from '@doday/lib';
import { getView } from './views';

export default {
  config,
  getView,
  actions: duck.actions,
  translations: {
    en,
  },
  stateSelector: (state: RootState) => state.activities,
};
