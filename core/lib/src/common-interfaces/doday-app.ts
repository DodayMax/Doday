import { IconNames } from '../types';
import { Doday } from '../models';

export type DrawerMenuItem = {
  text: string;
  route: string;
  icon?: IconNames;
  badge?: string | number;
  children?: DrawerMenuItem[];
};

export type CellProps = {
  doday: Doday;
  active?: boolean;
  onClick?: (route: string, doday: Doday) => void;
};

export type SidebarQueryParams = {
  completed?: boolean;
  published?: boolean;
};

export type ThemeType = 'dark' | 'light';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
