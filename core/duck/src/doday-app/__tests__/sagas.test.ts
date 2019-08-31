import { ChangeDodayAppRouteAction, ActionConstants } from '../actions';
import { changeDodayAppRouteActionSaga } from '../sagas';
import { call } from 'redux-saga/effects';
import { bake_cookie } from 'sfcookies';

describe('Test Doday app sagas', () => {
  it('changeDodayAppRouteActionSaga', () => {
    const action: ChangeDodayAppRouteAction = {
      type: ActionConstants.CHANGE_ROUTE,
      payload: '/activities',
    };
    const gen = changeDodayAppRouteActionSaga(action);

    expect(gen.next().value).toEqual(
      call(bake_cookie, 'route', action.payload)
    );
    expect(gen.next().done).toBe(true);
  });
});
