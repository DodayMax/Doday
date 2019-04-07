import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  FetchActivityTypesAction,
  setActivityTypes,
  CreateAndTakeDodayAction,
  setBuilderLoadingState,
  setBuilderSuccessFlag,
  ParseUrlMetadataAction,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
} from './actions';
import { fetchDodaysForDate } from '@ducks/doday-app/actions';
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

/**
 * Create Doday and Progress node saga
 *
 * @param {CreateAndTakeDodayAction} action
 */
function* createAndTakeDodaySaga(action: CreateAndTakeDodayAction) {
  yield put(setBuilderLoadingState(true));
  const res = yield call(
    api.dodays.mutations.createAndTakeDodayNode,
    action.payload
  );
  if (res.status === 200) {
    yield put(setBuilderSuccessFlag(true));
    yield put(fetchDodaysForDate());
  }
  yield put(setBuilderLoadingState(false));
}

/**
 * Fetch activity types for builder saga
 *
 * @param {ParseUrlMetadataAction} action
 */
function* parseUrlMetadataSaga(action: ParseUrlMetadataAction) {
  yield put(setUrlParsingProgressActionCreator(true));
  const metadata = yield call(
    api.utils.queries.parseMetadataFromUrl,
    action.payload
  );
  if (metadata) {
    yield put(setParsedUrlMetadataObjectActionCreator(metadata));
  }
  yield put(setUrlParsingProgressActionCreator(false));
}

export default [
  takeLatest(ActionConstants.FETCH_ACTIVITY_TYPES, fetchActivityTypesSaga),
  takeLatest(ActionConstants.CREATE_AND_TAKE_DODAY, createAndTakeDodaySaga),
  takeLatest(ActionConstants.PARSE_URL, parseUrlMetadataSaga),
];
