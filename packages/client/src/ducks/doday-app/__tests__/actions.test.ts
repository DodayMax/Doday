import { ActionConstants, actionCreators } from '../actions';
import { DodayAppQueryParams } from '@root/lib/common-interfaces';

describe('doday-app action creators', () => {
  it('set loading state action creator', () => {
    const value = true;
    const expectedActionObject = {
      type: ActionConstants.SET_LOADING_STATE,
      payload: value,
    };
    expect(actionCreators.setDodayAppLoadingStateActionCreator(value)).toEqual(
      expectedActionObject
    );
  });

  it('change DodayApp route action creator', () => {
    const path = '/';
    const expectedActionObject = {
      type: ActionConstants.CHANGE_ROUTE,
      payload: path,
    };
    expect(actionCreators.changeDodayAppRouteActionCreator(path)).toEqual(
      expectedActionObject
    );
  });

  it('set DodayApp query params action creator', () => {
    const params: DodayAppQueryParams = {
      completed: true,
    };
    const expectedActionObject = {
      type: ActionConstants.SET_QUERY_PARAMS,
      payload: params,
    };
    expect(actionCreators.setDodayAppQueryParamsActionCreator(params)).toEqual(
      expectedActionObject
    );
  });

  it('set DodayApp badge action creator', () => {
    const value = 5;
    const expectedActionObject = {
      type: ActionConstants.SET_DODAYS_BADGE_FOR_TODAY,
      payload: value,
    };
    expect(actionCreators.setDodaysBadgeForTodayActionCreator(value)).toEqual(
      expectedActionObject
    );
  });
});
