import actions, {
  StoreActionConstants,
  FetchPublicDodaysForStoreAction,
  SetPublicDodaysForStoreAction,
  SetStoreLoadingStateAction,
  SearchPublicDodaysForStoreAction,
  OptimisticRemovePublicDodayAction,
  SetSearchTermAction,
  SetSearchFlagAction,
} from '../actions';
import { DodaysQueryParams } from '@doday/api';
import { DodayLike, activity, doday } from '@doday/lib';

describe('store action creators', () => {
  it('set Store loading state action creator', () => {
    const value = true;
    const expectedActionObject: SetStoreLoadingStateAction = {
      type: StoreActionConstants.SET_LOADING_STATE,
      payload: value,
    };
    expect(actions.setStoreLoadingStateActionCreator(value)).toEqual(
      expectedActionObject
    );
  });

  it('set search term action creator', () => {
    const term = 'Search term';
    const expectedActionObject: SetSearchTermAction = {
      type: StoreActionConstants.SET_SEARCH_TERM,
      payload: term,
    };
    expect(actions.setSearchTermActionCreator(term)).toEqual(
      expectedActionObject
    );
  });

  it('set search flag action creator', () => {
    const flag = true;
    const expectedActionObject: SetSearchFlagAction = {
      type: StoreActionConstants.SET_SEARCH_FLAG,
      payload: flag,
    };
    expect(actions.setSearchFlagActionCreator(flag)).toEqual(
      expectedActionObject
    );
  });

  it('search dodays action creator', () => {
    const params: DodaysQueryParams = {};
    const expectedActionObject: SearchPublicDodaysForStoreAction = {
      type: StoreActionConstants.SEARCH_DODAYS_WITH_PARAMS,
      payload: params,
    };
    expect(actions.searchPublicDodaysForStoreActionCreator(params)).toEqual(
      expectedActionObject
    );
  });

  it('fetch dodays for store without params action creator', () => {
    const params: DodaysQueryParams = {};
    const expectedActionObject: FetchPublicDodaysForStoreAction = {
      type: StoreActionConstants.FETCH_DODAYS_WITH_PARAMS,
      payload: params,
    };
    expect(actions.fetchPublicDodaysForStoreActionCreator(params)).toEqual(
      expectedActionObject
    );
  });

  it('set dodays for store action creator', () => {
    const dodays: DodayLike[] = [activity];
    const expectedActionObject: SetPublicDodaysForStoreAction = {
      type: StoreActionConstants.SET_DODAYS,
      payload: {
        dodays,
      },
    };
    expect(actions.setPublicDodaysForStoreActionCreator(dodays)).toEqual(
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
      type: StoreActionConstants.SET_DODAYS,
      payload: {
        dodays: payload.dodays,
        concat: payload.concat,
        totalCount: payload.totalCount,
      },
    };
    expect(
      actions.setPublicDodaysForStoreActionCreator(
        payload.dodays,
        payload.concat,
        payload.totalCount
      )
    ).toEqual(expectedActionObject);
  });

  it('optimistic remove public doday from store dodays', () => {
    const expectedActionObject: OptimisticRemovePublicDodayAction = {
      type: StoreActionConstants.OPTIMISTIC_REMOVE_PUBLIC_DODAY,
      payload: doday.did,
    };
    expect(actions.optimisticRemovePublicDodayActionCreator(doday.did)).toEqual(
      expectedActionObject
    );
  });
});
