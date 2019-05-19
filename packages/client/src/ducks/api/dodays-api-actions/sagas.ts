import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import {
  ActionConstants,
  DeleteDodayAction,
  UntakeDodayAction,
  UpdateDodayAction,
  TakeDodayAction,
  CreateDodayAction,
  CreateAndTakeDodayAction,
} from './actions';
import { api } from '@services';
import {
  setDodayDetailsLoadingStateActionCreator,
  updateSelectedDodayProgressActionCreator,
  clearDodayDetailsDirtyStuffActionCreator,
} from '@root/ducks/doday-details/actions';
import { setDodayAppLoadingStateActionCreator } from '@root/ducks/doday-app/actions';
import { setBuilderSuccessFlagActionCreator } from '@root/ducks/builder/actions';
import { activeTools } from '@root/ducks/auth/selectors';
import { selectedDoday } from '@root/ducks/doday-details/selectors';
import { ToolBeacon } from '@root/tools/types';

/**
 * Create Doday node and relations to Hero
 *
 * @param {CreateDodayAction} action
 */
function* createDodayActionSaga(action: CreateDodayAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.createDodayMutation, action.payload);
  const tools = yield select(activeTools);
  const sideEffects = [];
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity = tool.config.entities.find(
      entity => entity.type === action.payload.doday.type
    );
    if (entity) {
      sideEffects.push(
        put(
          tool.duck.actions.optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
            action.payload
          )
        )
      );
    }
  });
  yield all(sideEffects);
  yield put(setBuilderSuccessFlagActionCreator(true));
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Create Doday and Progress nodes and relations to Hero
 *
 * @param {CreateAndTakeDodayAction} action
 */
function* createAndTakeDodayActionSaga(action: CreateAndTakeDodayAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.createAndTakeDodayMutation, action.payload);
  const tools = yield select(activeTools);
  const sideEffects = [];
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity = tool.config.entities.find(
      entity => entity.type === action.payload.doday.type
    );
    if (entity) {
      sideEffects.push(
        put(
          tool.duck.actions.optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
            action.payload
          )
        )
      );
    }
  });
  yield all(sideEffects);
  yield put(setBuilderSuccessFlagActionCreator(true));
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Take Doday - create Progress node and connect to Hero
 *
 * @param {TakeDodayAction} action
 */
function* takeDodayActionSaga(action: TakeDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.takeDodayMutation, {
    did: action.payload.did,
    progress: action.payload.progress,
  });
  const tools = yield select(activeTools);
  const selected = yield select(selectedDoday);
  const sideEffects = [];
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity = tool.config.entities.find(
      entity => entity.type === action.payload.type
    );
    if (entity) {
      sideEffects.push(
        put(
          tool.duck.actions.optimisticUpdatesActionCreators.takeDodayOptimisticUpdateActionCreator(
            {
              did: action.payload.did,
              progress: action.payload.progress,
            }
          )
        )
      );
      if (selected && selected.did === action.payload.did) {
        sideEffects.push(
          put(
            updateSelectedDodayProgressActionCreator(
              entity.deserializeProgress(action.payload.progress)
            )
          )
        );
      }
    }
  });
  yield all(sideEffects);
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * Delete Doday - delete Doday and all related nodes from graph
 *
 * @param {DeleteDodayAction} action
 */
function* deleteDodayActionSaga(action: DeleteDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.deleteDodayMutation, action.payload.did);
  const tools = yield select(activeTools);
  const sideEffects = [];
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity = tool.config.entities.find(
      entity => entity.type === action.payload.type
    );
    if (entity) {
      sideEffects.push(
        put(
          tool.duck.actions.optimisticUpdatesActionCreators.deleteDodayOptimisticUpdateActionCreator(
            action.payload.did
          )
        )
      );
    }
  });
  yield all(sideEffects);
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * UnTake Doday - remove Progress node and relations to Hero
 *
 * @param {UnTakeDodayAction} action
 */
function* unTakeDodayActionSaga(action: UntakeDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.untakeDodayMutation, action.payload.did);
  const tools = yield select(activeTools);
  const selected = yield select(selectedDoday);
  const sideEffects = [];
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity = tool.config.entities.find(
      entity => entity.type === action.payload.type
    );
    if (entity) {
      sideEffects.push(
        put(
          tool.duck.actions.optimisticUpdatesActionCreators.untakeDodayOptimisticUpdateActionCreator(
            action.payload.did
          )
        )
      );
    }
  });
  if (selected && selected.did === action.payload.did) {
    yield put(updateSelectedDodayProgressActionCreator(undefined));
  }
  yield all(sideEffects);
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * Update doday saga
 *
 * @param {UpdateDodayAction} action
 */
function* updateDodayActionSaga(action: UpdateDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.updateDodayMutation, {
    did: action.payload.did,
    updates: action.payload.updates,
  });
  const tools = yield select(activeTools);
  const selected = yield select(selectedDoday);
  const sideEffects = [];
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity = tool.config.entities.find(
      entity => entity.type === action.payload.type
    );
    if (entity) {
      sideEffects.push(
        put(
          tool.duck.actions.optimisticUpdatesActionCreators.updateDodayOptimisticUpdateActionCreator(
            {
              did: action.payload.did,
              updates: action.payload.updates,
            }
          )
        )
      );
      if (selected && selected.did === action.payload.did) {
        const deserializedProgress = entity.deserializeProgress(
          action.payload.updates.progress
        );
        sideEffects.push(
          put(updateSelectedDodayProgressActionCreator(deserializedProgress))
        );
      }
    }
  });
  yield all(sideEffects);
  yield put(clearDodayDetailsDirtyStuffActionCreator());
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

export default [
  takeLatest(ActionConstants.CREATE_DODAY, createDodayActionSaga),
  takeLatest(
    ActionConstants.CREATE_AND_TAKE_DODAY,
    createAndTakeDodayActionSaga
  ),
  takeLatest(ActionConstants.TAKE_DODAY, takeDodayActionSaga),
  takeLatest(ActionConstants.UPDATE_DODAY, updateDodayActionSaga),
  takeLatest(ActionConstants.DELETE_DODAY, deleteDodayActionSaga),
  takeLatest(ActionConstants.UNTAKE_DODAY, unTakeDodayActionSaga),
];
