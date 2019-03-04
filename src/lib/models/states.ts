import { Doday } from "../common-interfaces";

export interface RootState {
  dodayApp: DodayAppState;
  heroSettings: HeroSettingsState;
}

export interface DodayAppState {
  path: string;
  navStack: Doday[];
  todayDodays: Doday[];
  chosenDate: Date;
}

export interface HeroSettingsState {
  isDrawerShown: boolean;
}