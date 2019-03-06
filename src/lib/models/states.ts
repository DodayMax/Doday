import { Doday, ActivityType } from "../common-interfaces";

export interface RootState {
  dodayApp: DodayAppState;
  builder: BuilderState;
  heroSettings: HeroSettingsState;
}

export interface DodayAppState {
  loading: boolean;
  path: string,
  badge: number;
  navStack: Doday[];
  dodays: Doday[];
  goals: Doday[];
  chosenDate: Date;
}

export interface BuilderState {
  activityTypes: ActivityType[];
}

export interface HeroSettingsState {
  isDrawerShown: boolean;
}