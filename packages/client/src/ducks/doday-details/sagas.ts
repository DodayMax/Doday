import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import {
  ActionConstants,
  FetchSelectedDodayAction,
  RequestForSetUpdatesAction,
  setSelectedDodayActionCreator,
} from './actions';
import { api } from '@root/services';

/**
 * Fetch selected doday saga
 *
 * @param {FetchSelectedDodayAction} action
 */
function* fetchSelectedDodayActionSaga(action: FetchSelectedDodayAction) {
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
    ActionConstants.REQUEST_FOR_SET_UPDATES,
    setUpdatesAndDirtyStatusSaga
  ),
];
