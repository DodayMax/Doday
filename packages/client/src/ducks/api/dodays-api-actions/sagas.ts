import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  DeleteDodayAction,
  UntakeDodayAction,
  UpdateDodayAction,
  FetchDodayByDIDAction,
  FetchDodayWithProgressByDIDAction,
} from './actions';
import { api } from '@services';
import { setDodayDetailsLoadingStateActionCreator } from '@root/ducks/doday-details/actions';
import { setDodayAppLoadingStateActionCreator } from '@root/ducks/doday-app/actions';

/**
 * Fetch doday node by DID
 *
 * @param {FetchDodayByDIDAction} action
 */
function* fetchDodayByDIDActionSaga(action: FetchDodayByDIDAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  const dodays = yield call(api.dodays.queries.fetchDodayByDID, action.payload);
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Fetch doday with Progress node by DID
 *
 * @param {FetchDodayWithProgressByDIDAction} action
 */
function* fetchDodayWithProgressByDIDActionSaga(
  action: FetchDodayWithProgressByDIDAction
) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  const dodays = yield call(
    api.dodays.queries.fetchDodayWithProgressByDID,
    action.payload
  );
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Delete doday saga
 *
 * @param {DeleteDodayAction} action
 */
function* deleteDodayActionSaga(action: DeleteDodayAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.deleteDodayMutation, action.payload);
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Remove doday from app saga
 *
 * @param {UntakeDodayAction} action
 */
function* untakeDodayActionSaga(action: UntakeDodayAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.untakeDodayMutation, action.payload);
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Update doday saga
 *
 * @param {UpdateDodayAction} action
 */
function* updateDodayActionSaga(action: UpdateDodayAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.updateDodayMutation, {
    did: action.payload.doday.did,
    updates: { ...action.payload },
  });
  yield put(setDodayDetailsLoadingStateActionCreator(false));
  yield put(setDodayAppLoadingStateActionCreator(false));
}

export default [
  takeLatest(ActionConstants.FETCH_DODAY_BY_DID, fetchDodayByDIDActionSaga),
  takeLatest(
    ActionConstants.FETCH_DODAYS_WITH_PROGRESS_BY_DID,
    fetchDodayWithProgressByDIDActionSaga
  ),
  takeLatest(ActionConstants.UPDATE_DODAY, updateDodayActionSaga),
  takeLatest(ActionConstants.DELETE_DODAY, deleteDodayActionSaga),
  takeLatest(ActionConstants.UNTAKE_DODAY, untakeDodayActionSaga),
];
