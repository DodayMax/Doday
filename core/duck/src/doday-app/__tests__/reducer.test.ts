import reducer from '../reducer';
import actions from '../actions';
import { DodayAppQueryParams } from '@doday/lib';

describe('DodayApp reducers', () => {
  it('set DodayApp loading state reducer', () => {
    const value = true;
    expect(
      reducer(undefined, actions.setDodayAppLoadingStateActionCreator(value))
        .loading
    ).toBe(value);
  });

  it('change DodayApp route reducer', () => {
    const path = '/route';
    expect(
      reducer(undefined, actions.changeDodayAppRouteActionCreator(path)).route
    ).toEqual(path);
  });

  it('set DodayApp query params reducer', () => {
    const params: DodayAppQueryParams = {
      completed: true,
    };
    expect(
      reducer(undefined, actions.setDodayAppQueryParamsActionCreator(params))
        .routeParams
    ).toEqual(params);
  });

  it('set dodays badge for today reducer', () => {
    const value = 5;
    expect(
      reducer(undefined, actions.setDodaysBadgeForTodayActionCreator(5)).badge
    ).toEqual(value);
  });
});
