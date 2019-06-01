import { ToggleDrawerAction, ActionConstants } from '../actions';
import { toggleDrawerActionSaga } from '../sagas';
import { select, call } from 'redux-saga/effects';
import { isDrawerCollapsed } from '../selectors';
import { bake_cookie } from 'sfcookies';

describe('Test hero settings sagas', () => {
  it('toggleDrawerActionCreator without payload', () => {
    const action: ToggleDrawerAction = {
      type: ActionConstants.TOGGLE_DRAWER,
    };
    const selected = true;
    const gen = toggleDrawerActionSaga(action);

    expect(gen.next().value).toEqual(select(isDrawerCollapsed));
    expect(gen.next(selected).value).toEqual(
      call(bake_cookie, 'isDrawerCollapsed', `${selected}`)
    );
    expect(gen.next().done).toBe(true);
  });

  it('toggleDrawerActionCreator with payload', () => {
    const action: ToggleDrawerAction = {
      type: ActionConstants.TOGGLE_DRAWER,
      payload: false,
    };
    const selected = true;
    const gen = toggleDrawerActionSaga(action);

    expect(gen.next().value).toEqual(select(isDrawerCollapsed));
    expect(gen.next(selected).value).toEqual(
      call(bake_cookie, 'isDrawerCollapsed', `${action.payload}`)
    );
    expect(gen.next().done).toBe(true);
  });
});
