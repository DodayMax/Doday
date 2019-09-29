import reducer from '../reducer';
import actions from '../actions';
import { SidebarQueryParams } from '@doday/lib';

describe('Sidebar reducers', () => {
  it('set Sidebar loading state reducer', () => {
    const value = true;
    expect(
      reducer(undefined, actions.setSidebarLoadingStateActionCreator(value))
        .loading
    ).toBe(value);
  });

  it('change Sidebar route reducer', () => {
    const path = '/route';
    expect(
      reducer(undefined, actions.changeSidebarRouteActionCreator(path)).route
    ).toEqual(path);
  });

  it('set Sidebar query params reducer', () => {
    const params: SidebarQueryParams = {
      completed: true,
    };
    expect(
      reducer(undefined, actions.setSidebarQueryParamsActionCreator(params))
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
