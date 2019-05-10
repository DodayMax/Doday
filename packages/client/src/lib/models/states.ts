import { Hero } from './entities/hero';
import { BuilderStatus } from '@root/ducks/builder/reducer';
import { DodayLike, SerializedProgressLike } from './entities/common';
import { ActivityBuilderState } from '@root/tools/activities/duck/reducer';
import { ToolsState } from '@root/tools';

export interface RootState {
  auth: AuthState;
  dodayApp: DodayAppState;
  dodayDetails: DodayDetailsState;
  builder: BuilderState;
  heroSettings: HeroSettingsState;
}

export interface DodayAppStatusState {
  loading: boolean;
  badge: number;
}

export interface ScheduleState {
  chosenDate: Date;
  // navStack: Doday[];
  dodays: DodayLike[];
  completed: DodayLike[];
}

export type DodayAppState = {
  status: DodayAppStatusState;
  schedule: ScheduleState;
  tools: ToolsState;
};

export interface BuilderState {
  status: BuilderStatus;
  activity: ActivityBuilderState;
}

export interface AuthState {
  hero?: Hero;
}

export interface HeroSettingsState {
  isDrawerCollapsed: boolean;
  isDodayAppCollapsed: boolean;
}

export interface DodayDetailsState {
  loading: boolean;
  dirty?: boolean;
  updates?: Partial<SerializedProgressLike>;
  selectedDoday?: DodayLike;
}
