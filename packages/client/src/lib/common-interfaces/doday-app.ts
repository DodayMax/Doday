import { IconNames } from '@root/components/shared/_atoms/icons';

export type DodayAppPaths =
  | '/'
  | 'activities'
  | 'goals'
  | 'memos'
  | 'createdByMe';

export type DrawerMenuItem = {
  text: string;
  icon: IconNames;
  action: string;
  path: DodayAppPaths;
  badge?: string | number;
};
