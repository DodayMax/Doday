import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import {
  ActionConstants,
  FetchSelectedDodayAction,
  RequestForSetUpdatesAction,
  setSelectedDodayActionCreator,
  FetchSelectedProgressAction,
  TakeDodayAction,
  setDodayDetailsLoadingStateActionCreator,
  UnTakeDodayAction,
} from './actions';
import { api } from '@root/services';

/**
 * Fetch selected published Doday node saga
 *
 * @param {FetchSelectedDodayAction} action
 */
function* fetchSelectedDodayActionSaga(action: FetchSelectedDodayAction) {
  const doday = yield call(api.dodays.queries.fetchDodayByDID, action.payload);
  yield put(setSelectedDodayActionCreator(doday));
}

/**
 * Fetch selected Doday with Progress node saga
 *
 * @param {FetchSelectedProgressAction} action
 */
function* fetchSelectedProgressActionSaga(action: FetchSelectedProgressAction) {
  const doday = yield call(
    api.dodays.queries.fetchDodayWithProgressByDID,
    action.payload
  );
  yield put(setSelectedDodayActionCreator(doday));
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
 * UnTake Doday - remove Progress node and relations to Hero
 *
 * @param {UnTakeDodayAction} action
 */
function* unTakeDodayActionSaga(action: UnTakeDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.untakeDodayMutation, action.payload);
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * Set dirty status when new updates for selected
 * doday is coming
 *
 * @param {RequestForSetUpdatesAction} action
 */
function* setUpdatesAndDirtyStatusSaga(action: RequestForSetUpdatesAction) {
  // yield put(setUpdatesForSelectedDodayActionCreator(action.payload));
  // const updates: Partial<SerializedDoday> = yield select(updatesSelector);
  // const selected: Doday = yield select(selectedDoday);
  // const dirty =
  //   !isEmptyObject(updates) &&
  //   (updates.dateIsLocked !== selected.dateIsLocked ||
  //     updates.date != null ||
  //     updates.relatedGoal != null);
  // yield put(setDirtyStatusActionCreator(dirty));
}

export default [
  takeLatest(
    ActionConstants.FETCH_SELECTED_DODAY,
    fetchSelectedDodayActionSaga
  ),
  takeLatest(
    ActionConstants.FETCH_SELECTED_PROGRESS,
    fetchSelectedProgressActionSaga
  ),
  takeLatest(
    ActionConstants.REQUEST_FOR_SET_UPDATES,
    setUpdatesAndDirtyStatusSaga
  ),
  takeLatest(ActionConstants.TAKE_DODAY, takeDodayActionSaga),
  takeLatest(ActionConstants.UNTAKE_DODAY, unTakeDodayActionSaga),
];
