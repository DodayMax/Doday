import { IconNames } from '@root/components/shared/_atoms/icons';

export type DodayToolBeaconNames = 'Activity' | 'Goal' | 'Memorizer';

export type DodayAppPaths = '/' | 'activities' | 'goals' | 'memos' | 'public';

export type DrawerMenuItem = {
  text: string;
  icon: IconNames;
  action: string;
  path: DodayAppPaths;
  badge?: string | number;
};
