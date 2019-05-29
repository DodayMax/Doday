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
  updateSelectedDodayActionCreator,
  clearDodayDetailsDirtyStuffActionCreator,
} from '@root/ducks/doday-details/actions';
import { setDodayAppLoadingStateActionCreator } from '@root/ducks/doday-app/actions';
import { setBuilderSuccessFlagActionCreator } from '@root/ducks/builder/actions';
import { activeTools } from '@root/ducks/auth/selectors';
import { selectedDoday } from '@root/ducks/doday-details/selectors';
import {
  ToolBeacon,
  SerializedDodayLike,
  SerializedProgressLike,
} from '@root/tools/types';
import { Resource } from '@root/lib/models/entities/resource';
import { openToastActionCreator } from '@root/ducks/toast/actions';

/**
 * Create Doday node and relations to Hero
 *
 * @param {CreateDodayAction} action
 */
export function* createDodayActionSaga(action: CreateDodayAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  const tools = yield select(activeTools);
  const sideEffects = [];
  let serialized: {
    doday: SerializedDodayLike;
    resource: Resource;
  };
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity = tool.config.entities.find(
      entity => entity.type === action.payload.doday.type
    );
    if (entity) {
      /** Deserialize payload to update doday in store (in app we use deserialized dodays) */
      sideEffects.push(
        put(
          tool.duck.actions.optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
            {
              doday: action.payload.doday,
              resource: action.payload.resource,
            }
          )
        )
      );
      serialized = {
        doday: entity.serialize(action.payload.doday) as SerializedDodayLike,
        resource: action.payload.resource,
      };
    }
  });
  yield all(sideEffects);
  yield call(api.dodays.mutations.createDodayMutation, serialized);
  yield put(setBuilderSuccessFlagActionCreator(true));
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Create Doday and Progress nodes and relations to Hero
 *
 * @param {CreateAndTakeDodayAction} action
 */
export function* createAndTakeDodayActionSaga(
  action: CreateAndTakeDodayAction
) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  const tools = yield select(activeTools);
  const sideEffects = [];
  let serialized: {
    doday: SerializedDodayLike;
    progress: SerializedProgressLike;
    resource: Resource;
  };
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
        /** Deserialize payload to update doday in store (in app we use deserialized dodays) */
        put(
          tool.duck.actions.optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
            {
              doday: action.payload.doday,
              progress: action.payload.progress,
              resource: action.payload.resource,
            }
          )
        )
      );
      serialized = {
        doday: entity.serialize(action.payload.doday) as SerializedDodayLike,
        progress: entity.serializeProgress(
          action.payload.progress
        ) as SerializedProgressLike,
        resource: action.payload.resource,
      };
    }
  });
  yield all(sideEffects);
  yield call(api.dodays.mutations.createAndTakeDodayMutation, serialized);
  yield put(setBuilderSuccessFlagActionCreator(true));
  yield put(
    openToastActionCreator({
      open: true,
      messages: ['Your new Activity created!'],
    })
  );
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Take Doday - create Progress node and connect to Hero
 *
 * @param {TakeDodayAction} action
 */
export function* takeDodayActionSaga(action: TakeDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  const tools = yield select(activeTools);
  const selected = yield select(selectedDoday);
  const sideEffects = [];
  let serialized: SerializedProgressLike;
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
        /** Deserialize payload to update doday in store (in app we use deserialized dodays) */
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
            updateSelectedDodayActionCreator({
              progress: action.payload.progress,
            })
          )
        );
      }
      serialized = entity.serializeProgress(action.payload.progress);
    }
  });
  yield all(sideEffects);
  yield call(api.dodays.mutations.takeDodayMutation, {
    did: action.payload.did,
    progress: serialized,
  });
  yield put(
    openToastActionCreator({
      open: true,
      messages: ['Taken!'],
    })
  );
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * Delete Doday - delete Doday and all related nodes from graph
 *
 * @param {DeleteDodayAction} action
 */
export function* deleteDodayActionSaga(action: DeleteDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
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
  yield call(api.dodays.mutations.deleteDodayMutation, action.payload.did);
  yield put(
    openToastActionCreator({
      open: true,
      messages: ['Your doday is deleted!'],
    })
  );
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * UnTake Doday - remove Progress node and relations to Hero
 *
 * @param {UnTakeDodayAction} action
 */
export function* unTakeDodayActionSaga(action: UntakeDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
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
    yield put(updateSelectedDodayActionCreator(undefined));
  }
  yield all(sideEffects);
  yield call(api.dodays.mutations.untakeDodayMutation, action.payload.did);
  yield put(
    openToastActionCreator({
      open: true,
      messages: ['Untaken!'],
    })
  );
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * Update doday saga
 *
 * @param {UpdateDodayAction} action
 */
export function* updateDodayActionSaga(action: UpdateDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  const tools = yield select(activeTools);
  const selected = yield select(selectedDoday);
  const sideEffects = [];
  let serialized: {
    doday: Partial<SerializedDodayLike>;
    progress: Partial<SerializedProgressLike>;
    resource: Partial<Resource>;
  };
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
        /** Deserialize payload to update doday in store (in app we use deserialized dodays) */
        put(
          tool.duck.actions.optimisticUpdatesActionCreators.updateDodayOptimisticUpdateActionCreator(
            {
              did: action.payload.did,
              updates: {
                doday: action.payload.updates.doday,
                progress: action.payload.updates.progress,
              },
            }
          )
        )
      );
      if (selected && selected.did === action.payload.did) {
        sideEffects.push(
          put(
            updateSelectedDodayActionCreator({
              progress: action.payload.updates.progress,
            })
          )
        );
      }
      serialized = {
        doday: entity.serialize(action.payload.updates.doday),
        progress: entity.serializeProgress(action.payload.updates.progress),
        resource: action.payload.updates.resource,
      };
    }
  });
  yield all(sideEffects);
  yield call(api.dodays.mutations.updateDodayMutation, {
    did: action.payload.did,
    updates: serialized,
  });
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
