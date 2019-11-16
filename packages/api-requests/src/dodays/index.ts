import { APIService } from '@doday/lib';
import { createAPIUrl } from '../urls';

export const fetchDodaysRequest = () => {
  return APIService.request()
    .json()
    .get(createAPIUrl().dodays.get);
};
