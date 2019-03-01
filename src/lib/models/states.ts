export interface RootState {
  dodayApp: DodayAppState;
  heroSettings: HeroSettingsState;
}

export interface DodayAppState {
  path: string;
}

export interface HeroSettingsState {
  isDrawerShown: boolean;
}