import { activityToolBeacon } from './activities';
import { DodayAppToolState } from './activities/duck/reducer';

export const toolBeacons = [activityToolBeacon];

export default {
  activityToolBeacon,
};

export type ToolSysname = 'schedule' | 'activities' | 'memorizer';
export type ToolState = DodayAppToolState;
export type ToolsState = { [K in ToolSysname]?: ToolState };
