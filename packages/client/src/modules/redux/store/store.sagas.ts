import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
  ActionTypes,
  FetchDodaysAction,
  setDodaysActionCreator,
  setDodaysCountActionCreator,
  setStoreStatusActionCreator,
} from './store.actions';
import { fetchDodaysRequest } from '@requests';

export function* fetchDodaysSaga(action: FetchDodaysAction) {
  yield put(setStoreStatusActionCreator({ loading: true }));
  const response = yield call(fetchDodaysRequest);
  if (response.count) {
    yield put(setDodaysActionCreator(response.items));
    yield put(setDodaysCountActionCreator(response.count));
  }
  yield put(setStoreStatusActionCreator({ loading: false }));
}

export default function*() {
  yield all([takeLatest(ActionTypes.FETCH_DODAYS, fetchDodaysSaga)]);
}
