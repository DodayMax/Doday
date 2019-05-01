import { Hero } from './entities/hero';
import { BuilderStatus } from '@root/ducks/builder/reducer';
import { BuilderActivitiesState } from '@root/ducks/activities/reducer';

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
  activities: BuilderActivitiesState;
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
  selectedDoday?: Doday;
  selectedGoal?: Goal;
}
