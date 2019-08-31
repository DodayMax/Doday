import { call, put } from 'redux-saga/effects';
import { handleTokenSaga } from '../sagas';
import { ActionConstants, HandleTokenAction } from '../actions';
import { api } from '@root/services';
import { hero, stripeToken } from '@root/lib/common-interfaces/fake-data';
import { setHeroActionCreator } from '@root/ducks/auth/actions';

describe("Test Auth's sagas", () => {
  it('fetchHeroActionSaga', () => {
    const action: HandleTokenAction = {
      type: ActionConstants.HANDLE_TOKEN,
      payload: stripeToken,
    };
    const gen = handleTokenSaga(action);
    expect(gen.next().value).toEqual(
      call(api.payments.mutations.handleStripeToken, action.payload)
    );
    expect(gen.next(hero).value).toEqual(put(setHeroActionCreator(hero)));
    expect(gen.next().done).toBe(true);
  });
});
