import * as duck from './activity/duck';
import { components } from './activity/components';
import { config } from './activity/config';
import { ToolBeacon } from '@doday/lib';

export const activityToolBeacon: ToolBeacon = {
  config,
  components,
  duck,
};
