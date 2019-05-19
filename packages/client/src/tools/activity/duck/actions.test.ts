import { ActionConstants, fetchActivitiesActionCreator } from './actions';
import { DodaysWithProgressQueryParams } from '@root/services/api/dodays/queries';
import { DodayType } from '@root/tools/types';

describe('Activity tool action creators tests', () => {
  it('FETCH_ACTIVITIES', () => {
    const params: DodaysWithProgressQueryParams = {
      dodaytype: DodayType.Activity,
    };
    const expectedActionObject = {
      type: ActionConstants.FETCH_ACTIVITIES,
      payload: params,
    };
    expect(fetchActivitiesActionCreator(params)).toEqual(expectedActionObject);
  });
});
