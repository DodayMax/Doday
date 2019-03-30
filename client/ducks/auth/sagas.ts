import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionConstants, SetAuthenticatedStatus, setAuthenticatedStatus } from './actions';
import { auth } from '@services';

/**
 * Set authenticated status when UPDATE_AUTHENTICATED_STATUS called
 *
 * @param {SetAuthenticatedStatus} action
 */
function* setAuthenticatedStatusSaga(action: SetAuthenticatedStatus) {
  // const status = yield call(auth.isAuthenticated);
  // yield put(setAuthenticatedStatus(status));
}

export default [
  takeLatest(ActionConstants.UPDATE_AUTHENTICATED_STATUS, setAuthenticatedStatusSaga),
];