import { Activity } from '../common-interfaces';
import { Hero } from './entities/Hero';
import { Doday } from './entities/Doday';
import { Goal } from './entities/Goal';

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
  goals: Goal[];
  chosenDate: Date;
}

export interface AuthState {
  hero?: Hero;
}

export interface BuilderState {
  loading?: boolean;
  selectedGoal?: Goal;
  isUrlParsing?: boolean;
  parsedMetadata?: any;
  success?: boolean;
  activityType?: Activity;
}

export interface HeroSettingsState {
  isDrawerCollapsed: boolean;
  isDodayAppCollapsed: boolean;
}

export interface DodayDetailsState {
  loading: boolean;
  selectedDoday?: Doday;
  selectedGoal?: Goal;
}
