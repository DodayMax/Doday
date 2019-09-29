import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  ActionConstants,
  ParseUrlMetadataAction,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
  setActivityTypeActionCreator,
  FetchActivitiesAction,
  setActivitiesActionCreator,
} from './actions';
import { detectActivityType, parseMetadataFromUrl } from '@doday/lib';
import ducks from '@doday/duck';
import api, { DodaysWithProgressQueryParams } from '@doday/api';

/**
 * Fetch Activities(Dodays) nodes with query params
 *
 * @param {FetchActivitiesAction} action
 */
export function* fetchActivitiesActionSaga(action: FetchActivitiesAction) {
  yield put(ducks.sidebar.actions.setSidebarLoadingStateActionCreator(true));
  const params: DodaysWithProgressQueryParams = action.payload;
  const activities = yield call(api.dodays.queries.fetchDodays, params);
  const activitiesWithProgress = yield call(
    api.dodays.queries.fetchDodaysWithProgress,
    params
  );
  yield put(
    setActivitiesActionCreator(activities.concat(activitiesWithProgress))
  );
  yield put(ducks.sidebar.actions.setSidebarLoadingStateActionCreator(false));
}

/**
 * Parse url metadata from input url
 *
 * @param {ParseUrlMetadataAction} action
 */
export function* parseUrlMetadataActionSaga(action: ParseUrlMetadataAction) {
  yield put(setUrlParsingProgressActionCreator(true));
  const metadata = yield call(parseMetadataFromUrl, action.payload);
  const activityType = yield call(detectActivityType, metadata);
  if (metadata) {
    yield put(setParsedUrlMetadataObjectActionCreator(metadata));
    yield put(setActivityTypeActionCreator(activityType));
  }
  yield put(setUrlParsingProgressActionCreator(false));
}

export function* mainSagas() {
  yield all([
    takeLatest(ActionConstants.FETCH_ACTIVITIES, fetchActivitiesActionSaga),
  ]);
}

export function* builderSagas() {
  yield all([
    takeLatest(ActionConstants.PARSE_URL, parseUrlMetadataActionSaga),
  ]);
}
