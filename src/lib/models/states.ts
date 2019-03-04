import { Doday } from "../common-interfaces";

export interface RootState {
  dodayApp: DodayAppState;
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

export interface HeroSettingsState {
  isDrawerShown: boolean;
}