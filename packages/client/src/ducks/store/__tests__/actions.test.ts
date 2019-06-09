import {
  ActionConstants,
  actionCreators,
  FetchPublicDodaysForStoreAction,
  SetPublicDodaysForStoreAction,
  SetStoreLoadingStateAction,
  SearchPublicDodaysForStoreAction,
} from '../actions';
import { DodaysQueryParams } from '@root/services/api/dodays/queries';
import { activity } from '@root/lib/common-interfaces/fake-data';
import { DodayLike } from '@root/lib/models/entities/common';

describe('store action creators', () => {
  it('set Store loading state action creator', () => {
    const value = true;
    const expectedActionObject: SetStoreLoadingStateAction = {
      type: ActionConstants.SET_LOADING_STATE,
      payload: value,
    };
    expect(actionCreators.setStoreLoadingStateActionCreator(value)).toEqual(
      expectedActionObject
    );
  });

  it('search dodays action creator', () => {
    const params: DodaysQueryParams = {};
    const expectedActionObject: SearchPublicDodaysForStoreAction = {
      type: ActionConstants.SEARCH_DODAYS_WITH_PARAMS,
      payload: params,
    };
    expect(
      actionCreators.searchPublicDodaysForStoreActionCreator(params)
    ).toEqual(expectedActionObject);
  });

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
      payload: {
        dodays,
      },
    };
    expect(actionCreators.setPublicDodaysForStoreActionCreator(dodays)).toEqual(
      expectedActionObject
    );
  });

  it('set dodays for store action creator with all params', () => {
    const payload = {
      dodays: [activity],
      concat: true,
      totalCount: 20,
    };
    const expectedActionObject: SetPublicDodaysForStoreAction = {
      type: ActionConstants.SET_DODAYS,
      payload: {
        dodays: payload.dodays,
        concat: payload.concat,
        totalCount: payload.totalCount,
      },
    };
    expect(
      actionCreators.setPublicDodaysForStoreActionCreator(
        payload.dodays,
        payload.concat,
        payload.totalCount
      )
    ).toEqual(expectedActionObject);
  });
});
