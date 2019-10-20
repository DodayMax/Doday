import { ActivityEntity, ToolConfig } from '@doday/lib';

export const config: ToolConfig = {
  sysname: 'activities',
  entities: [ActivityEntity],
  route: '/activities',
  icon: 'Activities',
};
