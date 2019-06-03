import { call, put } from 'redux-saga/effects';
import { api } from '@root/services';
import {
  FetchPublicDodaysForStoreAction,
  ActionConstants,
  actionCreators,
} from '../actions';
import { DodaysQueryParams } from '@root/services/api/dodays/queries';
import { fetchPublicDodaysForStoreActionSaga } from '../sagas';
import { activity } from '@root/lib/common-interfaces/fake-data';
import { DodayLike } from '@root/lib/models/entities/common';

describe("Test Store's sagas", () => {
  it('fetchPublicDodaysForStoreActionSaga', () => {
    const params: DodaysQueryParams = {};
    const action: FetchPublicDodaysForStoreAction = {
      type: ActionConstants.FETCH_DODAYS_WITH_PARAMS,
      payload: params,
    };
    const dodays: DodayLike[] = [activity];
    const gen = fetchPublicDodaysForStoreActionSaga(action);
    expect(gen.next().value).toEqual(
      call(api.dodays.queries.fetchDodays, action.payload)
    );
    expect(gen.next(dodays).value).toEqual(
      put(actionCreators.setPublicDodaysForStoreActionCreator(dodays))
    );
    expect(gen.next().done).toBe(true);
  });
});
