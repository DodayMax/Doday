import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import actions, {
  DodayDetailsActionConstants,
  FetchSelectedDodayAction,
  FetchSelectedProgressAction,
  RequestForSetUpdatesAction,
} from './actions';
import api from '@doday/api';
import { selectedDoday, updatesSelector } from './selectors';
import { isDirty, ProgressLike, DodayLike } from '@doday/lib';

/**
 * Fetch selected published Doday node saga
 *
 * @param {FetchSelectedDodayAction} action
 */
export function* fetchSelectedDodayActionSaga(
  action: FetchSelectedDodayAction
) {
  const doday = yield call(api.dodays.queries.fetchDodayByDID, action.payload);
  yield put(actions.setSelectedDodayActionCreator(doday));
}

/**
 * Fetch selected Doday with Progress node saga
 *
 * @param {FetchSelectedProgressAction} action
 */
export function* fetchSelectedProgressActionSaga(
  action: FetchSelectedProgressAction
) {
  yield put(actions.clearDodayDetailsDirtyStuffActionCreator());
  const doday = yield call(
    api.dodays.queries.fetchDodayWithProgressByDID,
    action.payload
  );
  yield put(actions.setSelectedDodayActionCreator(doday));
}

/**
 * Set dirty status when new updates for selected
 * doday is coming
 *
 * @param {RequestForSetUpdatesAction} action
 */
export function* setUpdatesAndDirtyStatusSaga(
  action: RequestForSetUpdatesAction
) {
  yield put(
    actions.setUpdatesForSelectedDodayActionCreator(action.payload!.progress!)
  );
  const updates: Partial<ProgressLike> = yield select(updatesSelector);
  const selected: DodayLike = yield select(selectedDoday);
  const dirty = yield call(isDirty, selected, updates);
  yield put(actions.setDirtyStatusActionCreator(dirty));
}

export default [
  takeLatest(
    DodayDetailsActionConstants.FETCH_SELECTED_DODAY,
    fetchSelectedDodayActionSaga
  ),
  takeLatest(
    DodayDetailsActionConstants.FETCH_SELECTED_PROGRESS,
    fetchSelectedProgressActionSaga
  ),
  takeLatest(
    DodayDetailsActionConstants.REQUEST_FOR_SET_UPDATES,
    setUpdatesAndDirtyStatusSaga
  ),
];
