import { IconNames } from '../types';
import { Node } from '../models';

export type DrawerMenuItem = {
  text: string;
  route: string;
  icon?: IconNames;
  badge?: string | number;
  children?: DrawerMenuItem[];
};

export type CellProps = {
  node: Node;
  active?: boolean;
  onClick?: (route: string, node: Node) => void;
};

export type SidebarQueryParams = {
  completed?: boolean;
  published?: boolean;
};

export type ThemeType = 'dark' | 'light';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
