import {
  ActionConstants,
  actionCreators,
  FetchPublicDodaysForStoreAction,
  SetPublicDodaysForStoreAction,
} from '../actions';
import { DodaysQueryParams } from '@root/services/api/dodays/queries';
import { activity } from '@root/lib/common-interfaces/fake-data';
import { DodayLike } from '@root/lib/models/entities/common';

describe('store action creators', () => {
  it('fetch dodays for store without params action creator', () => {
    const params: DodaysQueryParams = {};
    const expectedActionObject: FetchPublicDodaysForStoreAction = {
      type: ActionConstants.FETCH_DODAYS_WITH_PARAMS,
      payload: params,
    };
    expect(
      actionCreators.fetchPublicDodaysForStoreActionCreator(params)
    ).toEqual(expectedActionObject);
  });

  it('set dodays for store action creator', () => {
    const dodays: DodayLike[] = [activity];
    const expectedActionObject: SetPublicDodaysForStoreAction = {
      type: ActionConstants.SET_DODAYS,
      payload: dodays,
    };
    expect(actionCreators.setPublicDodaysForStoreActionCreator(dodays)).toEqual(
      expectedActionObject
    );
  });
});
