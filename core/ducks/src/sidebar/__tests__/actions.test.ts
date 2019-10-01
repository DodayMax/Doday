import actions, { SidebarActionConstants } from '../actions';
import { SidebarQueryParams } from '@doday/lib';

describe('sidebar action creators', () => {
  it('set loading state action creator', () => {
    const value = true;
    const expectedActionObject = {
      type: SidebarActionConstants.SET_LOADING_STATE,
      payload: value,
    };
    expect(actions.setSidebarLoadingStateActionCreator(value)).toEqual(
      expectedActionObject
    );
  });

  it('change Sidebar route action creator', () => {
    const path = '/';
    const expectedActionObject = {
      type: SidebarActionConstants.CHANGE_ROUTE,
      payload: path,
    };
    expect(actions.changeSidebarRouteActionCreator(path)).toEqual(
      expectedActionObject
    );
  });

  it('set Sidebar query params action creator', () => {
    const params: SidebarQueryParams = {
      completed: true,
    };
    const expectedActionObject = {
      type: SidebarActionConstants.SET_QUERY_PARAMS,
      payload: params,
    };
    expect(actions.setSidebarQueryParamsActionCreator(params)).toEqual(
      expectedActionObject
    );
  });

  it('set Sidebar badge action creator', () => {
    const value = 5;
    const expectedActionObject = {
      type: SidebarActionConstants.SET_DODAYS_BADGE_FOR_TODAY,
      payload: value,
    };
    expect(actions.setDodaysBadgeForTodayActionCreator(value)).toEqual(
      expectedActionObject
    );
  });
});
