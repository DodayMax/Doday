import { ChangeSidebarRouteAction, SidebarActionConstants } from '../actions';
import { changeSidebarRouteActionSaga } from '../sagas';
import { call } from 'redux-saga/effects';

describe('Test Doday app sagas', () => {
  it('changeSidebarRouteActionSaga', () => {
    const action: ChangeSidebarRouteAction = {
      type: SidebarActionConstants.CHANGE_ROUTE,
      payload: '/activities',
    };
    const gen = changeSidebarRouteActionSaga(action);

    expect(gen.next().value).toEqual(
      call(console.log, 'route', action.payload)
    );
    expect(gen.next().done).toBe(true);
  });
});
