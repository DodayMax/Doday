import { DrawerMenuItem, ToolConfig } from '@root/lib/common-interfaces';
import { DodayTypes } from '@root/lib/models/entities/common';
import DodayApp from './components/doday-app/doday-app';

export const config: ToolConfig = {
  sysname: 'activities',
  types: [DodayTypes.Activity],
  cost: 0,
};

export const drawerMenuItem: DrawerMenuItem = {
  text: 'Activities',
  path: '/activities',
  icon: 'Activities',
};

export const routes = {
  path: '/activities',
  component: DodayApp,
};
