import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import {
  ActionConstants,
  FetchSelectedDodayAction,
  RequestForSetUpdatesAction,
  setSelectedDodayActionCreator,
  FetchSelectedProgressAction,
  setUpdatesForSelectedDodayActionCreator,
  setDirtyStatusActionCreator,
} from './actions';
import { api } from '@root/services';
import { updatesSelector, selectedDoday } from './selectors';
import {
  SerializedProgressLike,
  DodayLike,
} from '@root/lib/models/entities/common';
import { isEmptyObject } from '@root/lib/utils';

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
 * Set dirty status when new updates for selected
 * doday is coming
 *
 * @param {RequestForSetUpdatesAction} action
 */
function* setUpdatesAndDirtyStatusSaga(action: RequestForSetUpdatesAction) {
  yield put(setUpdatesForSelectedDodayActionCreator(action.payload));
  const updates: Partial<SerializedProgressLike> = yield select(
    updatesSelector
  );
  const selected: DodayLike = yield select(selectedDoday);
  const dirty =
    !isEmptyObject(updates) &&
    (updates.dateIsLocked !== selected.progress.dateIsLocked ||
      updates.date != null);
  yield put(setDirtyStatusActionCreator(dirty));
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
];
