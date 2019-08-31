import actions, { DodayAppActionConstants } from '../actions';
import { DodayAppQueryParams } from '@doday/lib';

describe('doday-app action creators', () => {
  it('set loading state action creator', () => {
    const value = true;
    const expectedActionObject = {
      type: DodayAppActionConstants.SET_LOADING_STATE,
      payload: value,
    };
    expect(actions.setDodayAppLoadingStateActionCreator(value)).toEqual(
      expectedActionObject
    );
  });

  it('change DodayApp route action creator', () => {
    const path = '/';
    const expectedActionObject = {
      type: DodayAppActionConstants.CHANGE_ROUTE,
      payload: path,
    };
    expect(actions.changeDodayAppRouteActionCreator(path)).toEqual(
      expectedActionObject
    );
  });

  it('set DodayApp query params action creator', () => {
    const params: DodayAppQueryParams = {
      completed: true,
    };
    const expectedActionObject = {
      type: DodayAppActionConstants.SET_QUERY_PARAMS,
      payload: params,
    };
    expect(actions.setDodayAppQueryParamsActionCreator(params)).toEqual(
      expectedActionObject
    );
  });

  it('set DodayApp badge action creator', () => {
    const value = 5;
    const expectedActionObject = {
      type: DodayAppActionConstants.SET_DODAYS_BADGE_FOR_TODAY,
      payload: value,
    };
    expect(actions.setDodaysBadgeForTodayActionCreator(value)).toEqual(
      expectedActionObject
    );
  });
});
