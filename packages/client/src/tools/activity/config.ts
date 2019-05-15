import {
  serializeActivity,
  deserializeActivity,
  serializeActivityProgress,
  deserializeActivityProgress,
  isActivity,
} from './entities/activity';
import { ToolConfig, DodayType } from '../types';

export const config: ToolConfig = {
  sysname: 'activities',
  entities: [
    {
      type: DodayType.Activity,
      name: 'activity',
      serialize: serializeActivity,
      deserialize: deserializeActivity,
      serializeProgress: serializeActivityProgress,
      deserializeProgress: deserializeActivityProgress,
      isActivity,
    },
  ],
  price: 0,
  route: '/activities',
  icon: 'Activities',
};
