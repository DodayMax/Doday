import { activityToolBeacon } from './activities';
import { ActivityDodayAppToolState } from './activities/duck/reducer';

export const toolBeacons = [activityToolBeacon];

export default {
  activityToolBeacon,
};

export type ToolSysname = 'schedule' | 'activities' | 'memorizer';
export type ToolState = ActivityDodayAppToolState;
export type ToolsState = { [K in ToolSysname]?: ToolState };
