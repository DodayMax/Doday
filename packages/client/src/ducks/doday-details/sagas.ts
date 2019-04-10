import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  FetchSelectedDodayAction,
  setSelectedDodayActionCreator,
} from './actions';
import { api } from '@root/services';

/**
 * Fetch selected doday saga
 *
 * @param {FetchSelectedDodayAction} action
 */
function* FetchSelectedDodaySaga(action: FetchSelectedDodayAction) {
  const progress = yield call(api.dodays.queries.dodayProgressByID, {
    did: action.payload,
  });
  yield put(setSelectedDodayActionCreator(progress));
}

export default [
  takeLatest(ActionConstants.FETCH_SELECTED_DODAY, FetchSelectedDodaySaga),
];
