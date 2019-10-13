import { call, put } from 'redux-saga/effects';
import { getCurrentHeroSaga } from '../sagas';
import actions, { AuthActionConstants, GetCurrentHeroAction } from '../actions';
import api from '@doday/api';
import { hero } from '@doday/lib';

describe("Test Auth's sagas", () => {
  it('getCurrentHeroSaga', () => {
    const action: GetCurrentHeroAction = {
      type: AuthActionConstants.GET_CURRENT_HERO,
    };
    const gen = getCurrentHeroSaga(action);
    expect(gen.next().value).toEqual(call(api.auth.queries.meAPIRequest));
    expect(gen.next(hero).value).toEqual(
      put(actions.setHeroActionCreator(hero))
    );
    // expect(gen.next(hero).value).toEqual(call(activeToolsForHero, hero));
    // const activeTools = activeToolsForHero(hero);
    // expect(gen.next(activeTools).value).toEqual(
    //   put(setActiveToolBeaconsActionCreator(activeTools))
    // );
    expect(gen.next().done).toBe(true);
  });
});
