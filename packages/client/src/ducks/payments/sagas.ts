import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionConstants, HandleTokenAction } from './actions';
import { api } from '@root/services';
import { setHeroActionCreator } from '../auth/actions';

/**
 * Fetch Hero
 *
 * @param {HandleTokenAction} action
 */
function* handleTokenSaga(action: HandleTokenAction) {
  const res = yield call(
    api.payments.mutations.handleStripeToken,
    action.payload
  );

  yield put(setHeroActionCreator(res));
}

export default [takeLatest(ActionConstants.HANDLE_TOKEN, handleTokenSaga)];
