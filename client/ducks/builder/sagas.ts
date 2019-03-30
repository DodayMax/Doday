import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionConstants, FetchActivityTypesAction, setActivityTypes } from './actions';
import { api } from '@services';
import { activityTypes } from '@lib/fake-data/dodays';

/**
 * Fetch activity types for builder saga
 *
 * @param {FetchActivityTypesAction} action
 */
function* fetchActivityTypesSaga(action: FetchActivityTypesAction) {
  yield put(setActivityTypes(activityTypes));
}

export default [
  takeLatest(ActionConstants.FETCH_ACTIVITY_TYPES, fetchActivityTypesSaga),
];