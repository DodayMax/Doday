import * as duck from './duck';
import { components } from './components';
import { config } from './config';
import { ToolBeacon } from '@root/lib/common-interfaces';

export const activityToolBeacon: ToolBeacon = {
  config,
  components,
  duck,
};
