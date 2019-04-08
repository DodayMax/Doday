import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  CreateAndTakeDodayAction,
  setBuilderLoadingState,
  setBuilderSuccessFlag,
  ParseUrlMetadataAction,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
  setActivityTypeActionCreator,
  clearBuilderActionCreator,
} from './actions';
import { fetchDodaysForDate } from '@ducks/doday-app/actions';
import { api } from '@services';
import { detectActivityType } from '@root/lib/utils/regexp';

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
  yield put(clearBuilderActionCreator());
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
  const activityType = detectActivityType(metadata);
  if (metadata) {
    yield put(setParsedUrlMetadataObjectActionCreator(metadata));
    yield put(setActivityTypeActionCreator(activityType));
  }
  yield put(setUrlParsingProgressActionCreator(false));
}

export default [
  takeLatest(ActionConstants.CREATE_AND_TAKE_DODAY, createAndTakeDodaySaga),
  takeLatest(ActionConstants.PARSE_URL, parseUrlMetadataSaga),
];
