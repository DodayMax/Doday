import { activityToolBeacon } from './activities';
import { ActivityToolState } from './activities/duck/reducer';

export const toolBeacons = [activityToolBeacon];

export default {
  activityToolBeacon,
};

export type ToolSysname = 'schedule' | 'activities' | 'memorizer';
export type ToolState = ActivityToolState;
export type ToolsState = { [K in ToolSysname]?: ToolState };
