import * as duck from './activity/duck';
import { components } from './activity/views';
import { config } from './activity/config';
import {
  getActivitiesBuilderModule,
  getActivitiesMainModule,
} from './activity/modules';

export default {
  config,
  views: components,
  actions: duck.actions,
  modules: {
    main: getActivitiesMainModule,
    builder: getActivitiesBuilderModule,
  },
};
