import { call, put } from 'redux-saga/effects';
import api from '@doday/api';
import actions, {
  FetchPublicDodaysForStoreAction,
  StoreActionConstants,
  SearchPublicDodaysForStoreAction,
} from '../actions';
import {
  fetchPublicDodaysForStoreActionSaga,
  searchPublicDodaysForStoreActionSaga,
} from '../sagas';
import { DodaysQueryParams } from '@doday/api';
import { DodayLike, activity } from '@doday/lib';

describe("Test Store's sagas", () => {
  it('fetchPublicDodaysForStoreActionSaga', () => {
    const params: DodaysQueryParams = {};
    const action: FetchPublicDodaysForStoreAction = {
      type: StoreActionConstants.FETCH_DODAYS_WITH_PARAMS,
      payload: params,
    };
    const dodays: DodayLike[] = [activity];
    const totalCount = 20;
    const gen = fetchPublicDodaysForStoreActionSaga(action);
    expect(gen.next().value).toEqual(
      put(actions.setStoreLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(
      call(api.dodays.queries.fetchDodaysCount, action.payload)
    );
    expect(gen.next(totalCount).value).toEqual(
      call(api.dodays.queries.fetchDodays, action.payload)
    );
    expect(gen.next(dodays).value).toEqual(
      put(
        actions.setPublicDodaysForStoreActionCreator(
          dodays,
          !!params.skip,
          totalCount
        )
      )
    );
    expect(gen.next(dodays).value).toEqual(
      put(actions.setStoreLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('fetchPublicDodaysForStoreActionSaga with skip param', () => {
    const params: DodaysQueryParams = {
      skip: 20,
    };
    const action: FetchPublicDodaysForStoreAction = {
      type: StoreActionConstants.FETCH_DODAYS_WITH_PARAMS,
      payload: params,
    };
    const dodays: DodayLike[] = [activity];
    const gen = fetchPublicDodaysForStoreActionSaga(action);
    expect(gen.next().value).toEqual(
      put(actions.setStoreLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(
      call(api.dodays.queries.fetchDodays, action.payload)
    );
    expect(gen.next(dodays).value).toEqual(
      put(actions.setPublicDodaysForStoreActionCreator(dodays, !!params.skip))
    );
    expect(gen.next(dodays).value).toEqual(
      put(actions.setStoreLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('searchPublicDodaysForStoreActionSaga', () => {
    const params: DodaysQueryParams = {
      term: 'test term',
    };
    const action: SearchPublicDodaysForStoreAction = {
      type: StoreActionConstants.SEARCH_DODAYS_WITH_PARAMS,
      payload: params,
    };
    const totalCount = 20;
    const dodays: DodayLike[] = [activity];
    const gen = searchPublicDodaysForStoreActionSaga(action);
    expect(gen.next().value).toEqual(
      put(actions.setPublicDodaysForStoreActionCreator([]))
    );
    expect(gen.next().value).toEqual(
      put(actions.setStoreLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(
      call(api.dodays.queries.searchDodaysCount, action.payload)
    );
    expect(gen.next(totalCount).value).toEqual(
      call(api.dodays.queries.searchDodays, action.payload)
    );
    expect(gen.next(dodays).value).toEqual(
      put(
        actions.setPublicDodaysForStoreActionCreator(
          dodays,
          !!params.skip,
          totalCount
        )
      )
    );
    expect(gen.next(dodays).value).toEqual(
      put(actions.setStoreLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });
});
