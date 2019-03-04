import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionConstants, setDodaysForDate, FetchDodayForDate, ChangeDateAction } from './actions';
import { chosenDate } from '@ducks/all-selectors';
import { api } from '@services';
import { isToday } from '@root/lib/utils';

/**
 * Fetch dodays for chosen date saga
 *
 * @export
 * @param {FetchDodayForDate} action
 */
function* fetchDodayForDateSaga(action: FetchDodayForDate) {
  // get chosen date from store
  const date = yield select(chosenDate);
  if (isToday(date)) {
    const dodays = yield call(api.dodays.queries.dodaysForToday, {});
    yield put(setDodaysForDate(dodays));
  } else {
    const dodays = yield call(api.dodays.queries.dodaysForDate, { date });
    yield put(setDodaysForDate(dodays));
  }
}

/**
 * Fetch dodays for chosen date when date changes
 *
 * @export
 * @param {ChangeDateAction} action
 */
function* fetchDodayForDateWhenChange(action: ChangeDateAction) {
  const date = action.payload;
  if (isToday(date)) {
    const dodays = yield call(api.dodays.queries.dodaysForToday, {});
    yield put(setDodaysForDate(dodays));
  } else {
    const dodays = yield call(api.dodays.queries.dodaysForDate, { date });
    yield put(setDodaysForDate(dodays));
  }
}

export default [
  takeLatest(ActionConstants.FETCH_DODAYS_FOR_DATE, fetchDodayForDateSaga),
  takeLatest(ActionConstants.CHANGE_DATE, fetchDodayForDateWhenChange),
];