import { ChangeDodayAppRouteAction, DodayAppActionConstants } from '../actions';
import { changeDodayAppRouteActionSaga } from '../sagas';
import { call } from 'redux-saga/effects';

describe('Test Doday app sagas', () => {
  it('changeDodayAppRouteActionSaga', () => {
    const action: ChangeDodayAppRouteAction = {
      type: DodayAppActionConstants.CHANGE_ROUTE,
      payload: '/activities',
    };
    const gen = changeDodayAppRouteActionSaga(action);

    expect(gen.next().value).toEqual(
      call(console.log, 'route', action.payload)
    );
    expect(gen.next().done).toBe(true);
  });
});
