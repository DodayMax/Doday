import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
  ActionTypes,
  FetchDodaysAction,
  setDodaysActionCreator,
  setDodaysCountActionCreator,
  setStoreGridStatusActionCreator,
} from './store-grid.actions';
import { fetchDodaysRequest } from '@doday/requests';

export function* fetchDodaysSaga(action: FetchDodaysAction) {
  yield put(setStoreGridStatusActionCreator({ loading: true }));
  const response = yield call(fetchDodaysRequest);
  if (response.count) {
    yield put(setDodaysActionCreator(response.items));
    yield put(setDodaysCountActionCreator(response.count));
  }
  yield put(setStoreGridStatusActionCreator({ loading: false }));
}

export default function*() {
  yield all([takeLatest(ActionTypes.FETCH_DODAYS, fetchDodaysSaga)]);
}
