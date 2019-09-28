import * as duck from './activity/duck';
import { config } from './activity/config';
import {
  getActivitiesBuilderModule,
  getActivitiesMainModule,
} from './activity/modules';
import { en } from './activity/translations/en';
import { RootState } from '@doday/lib';
import { getView } from './activity/views';

export default {
  config,
  getView,
  actions: duck.actions,
  modules: {
    main: getActivitiesMainModule,
    builder: getActivitiesBuilderModule,
  },
  translations: {
    en,
  },
  stateSelector: (state: RootState) => state.activities,
};
