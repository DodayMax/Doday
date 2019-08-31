import { ToggleDrawerAction, HeroSettingsActionConstants } from '../actions';
import { toggleDrawerActionSaga } from '../sagas';
import { select, call } from 'redux-saga/effects';
import { isDrawerCollapsed } from '../selectors';

describe('Test hero settings sagas', () => {
  it('toggleDrawerActionCreator without payload', () => {
    const action: ToggleDrawerAction = {
      type: HeroSettingsActionConstants.TOGGLE_DRAWER,
    };
    const selected = true;
    const gen = toggleDrawerActionSaga(action);

    expect(gen.next().value).toEqual(select(isDrawerCollapsed));
    expect(gen.next(selected).value).toEqual(
      call(console.log, 'isDrawerCollapsed', `${selected}`)
    );
    expect(gen.next().done).toBe(true);
  });

  it('toggleDrawerActionCreator with payload', () => {
    const action: ToggleDrawerAction = {
      type: HeroSettingsActionConstants.TOGGLE_DRAWER,
      payload: false,
    };
    const selected = true;
    const gen = toggleDrawerActionSaga(action);

    expect(gen.next().value).toEqual(select(isDrawerCollapsed));
    expect(gen.next(selected).value).toEqual(
      call(console.log, 'isDrawerCollapsed', `${action.payload}`)
    );
    expect(gen.next().done).toBe(true);
  });
});
