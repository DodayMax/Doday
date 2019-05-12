import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  DeleteDodayAction,
  UntakeDodayAction,
  UpdateDodayAction,
  TakeDodayAction,
  CreateDodayAction,
  CreateAndTakeDodayAction,
} from './actions';
import { api } from '@services';
import { setDodayDetailsLoadingStateActionCreator } from '@root/ducks/doday-details/actions';
import { setDodayAppLoadingStateActionCreator } from '@root/ducks/doday-app/actions';

/**
 * Create Doday node and relations to Hero
 *
 * @param {CreateDodayAction} action
 */
function* createDodayActionSaga(action: CreateDodayAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.createDodayMutation, action.payload);
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Create Doday and Progress nodes and relations to Hero
 *
 * @param {CreateAndTakeDodayAction} action
 */
function* createAndTakeDodayActionSaga(action: CreateAndTakeDodayAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.createAndTakeDodayMutation, action.payload);
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Take Doday - create Progress node and connect to Hero
 *
 * @param {TakeDodayAction} action
 */
function* takeDodayActionSaga(action: TakeDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.takeDodayMutation, action.payload);
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * Delete Doday - delete Doday and all related nodes from graph
 *
 * @param {DeleteDodayAction} action
 */
function* deleteDodayActionSaga(action: DeleteDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.deleteDodayMutation, action.payload);
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * UnTake Doday - remove Progress node and relations to Hero
 *
 * @param {UnTakeDodayAction} action
 */
function* unTakeDodayActionSaga(action: UntakeDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.untakeDodayMutation, action.payload);
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * Update doday saga
 *
 * @param {UpdateDodayAction} action
 */
function* updateDodayActionSaga(action: UpdateDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.updateDodayMutation, {
    did: action.payload.did,
    updates: action.payload.updates,
  });
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

export default [
  takeLatest(ActionConstants.CREATE_DODAY, createDodayActionSaga),
  takeLatest(
    ActionConstants.CREATE_AND_TAKE_DODAY,
    createAndTakeDodayActionSaga
  ),
  takeLatest(ActionConstants.TAKE_DODAY, takeDodayActionSaga),
  takeLatest(ActionConstants.UPDATE_DODAY, updateDodayActionSaga),
  takeLatest(ActionConstants.DELETE_DODAY, deleteDodayActionSaga),
  takeLatest(ActionConstants.UNTAKE_DODAY, unTakeDodayActionSaga),
];
