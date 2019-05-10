import * as duck from './duck';
import { components } from './components';
import { config, routes, drawerMenuItem } from './config';
import { ToolBeacon } from '@root/lib/common-interfaces';

export const activityToolBeacon: ToolBeacon = {
  config,
  drawerMenuItem,
  routes,
  components,
  duck,
};
