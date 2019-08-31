import { ToolConfig } from '../types';
import { ActivityEntity } from '@root/lib/models/entities/activity';

export const config: ToolConfig = {
  sysname: 'activities',
  entities: [ActivityEntity],
  price: 0,
  route: '/activities',
  icon: 'Activities',
};
