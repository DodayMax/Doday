import { IconNames } from '@root/components/shared/_atoms/icons';
import { DodayLike } from '../models/entities/common';

export type DrawerMenuItem = {
  text: string;
  route: string;
  icon?: IconNames;
  badge?: string | number;
  children?: DrawerMenuItem[];
};

export type CellProps = {
  doday: DodayLike;
  active?: boolean;
  onClick?: (route: string, doday: DodayLike) => void;
};

export type DodayAppQueryParams = {
  completed?: boolean;
  published?: boolean;
};

export type ThemeType = 'dark' | 'light';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
