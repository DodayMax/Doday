import { Hero } from './entities/hero';
import { BuilderStatus } from '@root/ducks/builder/reducer';
import { ActivityBuilderState } from '@root/ducks/activities/reducer';
import { DodayLike } from './entities/common';

export interface RootState {
  auth: AuthState;
  dodayApp: DodayAppState;
  dodayDetails: DodayDetailsState;
  builder: BuilderState;
  heroSettings: HeroSettingsState;
}

export interface DodayAppState {
  loading: boolean;
  path: string;
  badge: number;
  navStack: Doday[];
  dodays: Doday[];
  public: Doday[];
  goals: Goal[];
  chosenDate: Date;
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
  updates?: Partial<SerializedDoday>;
  selectedDoday?: DodayLike;
}
