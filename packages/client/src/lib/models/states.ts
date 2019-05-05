import { Hero } from './entities/hero';
import { BuilderStatus } from '@root/ducks/builder/reducer';
import { DodayLike, SerializedProgressLike } from './entities/common';
import { ActivityBuilderState } from '@root/tools/activities/duck/reducer';

export interface RootState {
  auth: AuthState;
  dodayApp: DodayAppState;
  dodayDetails: DodayDetailsState;
  builder: BuilderState;
  heroSettings: HeroSettingsState;
}

export interface DodayAppState {
  loading: boolean;
  chosenDate: Date;
  path: string;
  badge: number;
  // navStack: Doday[];
  dodays: DodayLike[];
  completed: DodayLike[];
}

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
