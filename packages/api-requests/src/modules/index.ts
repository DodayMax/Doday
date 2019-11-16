import { APIService } from '@doday/lib';
import { createAPIUrl } from '../urls';

export const buyModuleRequest = (id: string) => {
  return APIService.request()
    .json()
    .get(createAPIUrl().modules.buy(id));
};
