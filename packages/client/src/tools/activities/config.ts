import { ToolConfig } from '@root/lib/common-interfaces';
import { DodayType } from '@root/lib/models/entities/common';

export const config: ToolConfig = {
  sysname: 'activities',
  entities: [
    {
      type: DodayType.Activity,
      name: 'activity',
    },
  ],
  cost: 0,
  route: '/activities',
  icon: 'Activities',
};
