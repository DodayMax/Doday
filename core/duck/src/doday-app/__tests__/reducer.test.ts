import reducer from '../reducer';
import { actionCreators } from '../actions';
import { DodayAppQueryParams } from '@root/lib/common-interfaces';

describe('DodayApp reducers', () => {
  it('set DodayApp loading state reducer', () => {
    const value = true;
    expect(
      reducer(
        undefined,
        actionCreators.setDodayAppLoadingStateActionCreator(value)
      ).loading
    ).toBe(value);
  });

  it('change DodayApp route reducer', () => {
    const path = '/route';
    expect(
      reducer(undefined, actionCreators.changeDodayAppRouteActionCreator(path))
        .route
    ).toEqual(path);
  });

  it('set DodayApp query params reducer', () => {
    const params: DodayAppQueryParams = {
      completed: true,
    };
    expect(
      reducer(
        undefined,
        actionCreators.setDodayAppQueryParamsActionCreator(params)
      ).routeParams
    ).toEqual(params);
  });

  it('set dodays badge for today reducer', () => {
    const value = 5;
    expect(
      reducer(undefined, actionCreators.setDodaysBadgeForTodayActionCreator(5))
        .badge
    ).toEqual(value);
  });
});
