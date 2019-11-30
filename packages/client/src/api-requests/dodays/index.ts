import { createAPIUrl } from '../urls';
import { APIService } from '@root/core/services';

export const fetchDodaysRequest = () => {
  return APIService.request()
    .json()
    .get(createAPIUrl().dodays.get);
};
