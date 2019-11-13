import { APIService, createAPIUrl } from '@doday/lib';

export const fetchDodaysRequest = () => {
  return APIService.request()
    .json()
    .get(createAPIUrl().dodays.get);
};
