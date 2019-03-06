import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionConstants, FetchActivityTypesAction, setActivityTypes } from './actions';
import { api } from '@services';

/**
 * Fetch activity types for builder saga
 *
 * @export
 * @param {FetchActivityTypesAction} action
 */
function* fetchActivityTypes(action: FetchActivityTypesAction) {
  const activityTypes = yield call(api.constants.queries.getActivityTypes, {});
  yield put(setActivityTypes(activityTypes));
}

export default [
  takeLatest(ActionConstants.FETCH_ACTIVITY_TYPES, fetchActivityTypes),
];