import * as duck from './duck';
import { components } from './components';
import { config } from './config';
import { ToolBeacon } from '@tools/types';

export const activityToolBeacon: ToolBeacon = {
  config,
  components,
  duck,
};
