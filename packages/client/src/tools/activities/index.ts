import { DodayAppPaths } from '@root/lib/common-interfaces';
import { IconNames } from '@root/components/shared/_atoms/icons';
import * as components from './components';
import * as duck from './duck';
import { config } from './config';

export const activityToolBeacon: ToolBeacon = {
  config,
  components,
  duck,
};

export interface ToolBeacon {
  config: ToolConfig;
  components: any;
  api?: any;
  duck?: any;
}

export type ToolConfig = {
  name: string;
  icon: IconNames;
  path: DodayAppPaths;
  cost: number;
};
