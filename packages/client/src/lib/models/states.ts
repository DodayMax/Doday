import { Doday, ActivityType } from '../common-interfaces';
import { Hero } from './entities';

export interface RootState {
  auth: AuthState;
  dodayApp: DodayAppState;
  builder: BuilderState;
  heroSettings: HeroSettingsState;
}

export interface DodayAppState {
  loading: boolean;
  path: string;
  badge: number;
  navStack: Doday[];
  dodays: Doday[];
  goals: Doday[];
  chosenDate: Date;
}

export interface AuthState {
  hero?: Hero;
}

export interface BuilderState {
  activityTypes: ActivityType[];
}

export interface HeroSettingsState {
  isDrawerShown: boolean;
}
