import { createAPIUrl } from '../urls';
import { APIService } from '@root/core/services';

export const buyModuleRequest = (id: string) => {
  return APIService.request()
    .json()
    .get(createAPIUrl().modules.buy(id));
};
