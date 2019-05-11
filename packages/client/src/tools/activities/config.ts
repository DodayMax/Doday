import { ToolConfig } from '@root/lib/common-interfaces';
import { DodayTypes } from '@root/lib/models/entities/common';

export const config: ToolConfig = {
  sysname: 'activities',
  entities: [DodayTypes.Activity],
  cost: 0,
  route: '/activities',
  icon: 'Activities',
};
