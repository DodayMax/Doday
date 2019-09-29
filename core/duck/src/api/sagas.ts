import api from '@doday/api';
import {
  call,
  put,
  takeLatest,
  select,
  all,
  SimpleEffect,
  PutEffectDescriptor,
} from 'redux-saga/effects';
import {
  APIActionConstants,
  DeleteDodayAction,
  UntakeDodayAction,
  UpdateDodayAction,
  TakeDodayAction,
  CreateDodayAction,
  CreateAndTakeDodayAction,
} from './actions';
import {
  SerializedDodayLike,
  Resource,
  ToolBeacon,
  SerializedProgressLike,
  SerializedActivity,
  SerializedActivityProgress,
} from '@doday/lib';
import storeActions from '../store/actions';
import sidebarActions from '../sidebar/actions';
import builderActions from '../builder/actions';
import toastActions from '../toast/actions';
import dodayDetailsActions from '../doday-details/actions';
import { activeToolsSelector } from '../auth/selectors';
import { searchTerm, publicDodays } from '../store/selectors';
import { selectedDodaySelector } from '../doday-details/selectors';

/**
 * Create Doday node and relations to Hero
 *
 * @param {CreateDodayAction} action
 */
export function* createDodayActionSaga(action: CreateDodayAction) {
  yield put(sidebarActions.setSidebarLoadingStateActionCreator(true));
  const tools = yield select(activeToolsSelector);
  const sideEffects: SimpleEffect<'PUT', PutEffectDescriptor<any>>[] = [];
  let serialized:
    | {
        doday: SerializedDodayLike;
        resource: Resource | undefined;
      }
    | undefined;
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity =
      tool.config.entities &&
      tool.config.entities.find(
        entity => entity.type === action.payload.doday.type
      );
    if (entity) {
      /** Deserialize payload to update doday in store (in app we use deserialized dodays) */
      sideEffects.push(
        put(
          tool.actions &&
            tool.actions.optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
              {
                doday: action.payload.doday,
                resource: action.payload.resource,
              }
            )
        )
      );
      serialized = {
        doday: entity.serialize!(action.payload.doday) as SerializedDodayLike,
        resource: action.payload.resource,
      };
    }
  });
  yield all(sideEffects);
  if (serialized) {
    yield call(api.dodays.mutations.createDodayMutation, serialized);
  }
  yield put(builderActions.clearBuilderActionCreator());
  yield put(
    toastActions.openToastActionCreator({
      open: true,
      messages: ['Your new Activity created!'],
    })
  );
  yield put(sidebarActions.setSidebarLoadingStateActionCreator(false));
}

/**
 * Create Doday and Progress nodes and relations to Hero
 *
 * @param {CreateAndTakeDodayAction} action
 */
export function* createAndTakeDodayActionSaga(
  action: CreateAndTakeDodayAction
) {
  yield put(sidebarActions.setSidebarLoadingStateActionCreator(true));
  const tools = yield select(activeToolsSelector);
  const sideEffects: SimpleEffect<'PUT', PutEffectDescriptor<any>>[] = [];
  let serialized:
    | {
        doday: SerializedDodayLike;
        progress: SerializedProgressLike;
        resource: Resource | undefined;
      }
    | undefined;
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity =
      tool.config.entities &&
      tool.config.entities.find(
        entity => entity.type === action.payload.doday.type
      );
    if (entity) {
      sideEffects.push(
        /** Deserialize payload to update doday in store (in app we use deserialized dodays) */
        put(
          tool.actions &&
            tool.actions.optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
              {
                doday: action.payload.doday,
                progress: action.payload.progress,
                resource: action.payload.resource,
              }
            )
        )
      );
      serialized = {
        doday: entity.serialize!(action.payload.doday) as SerializedDodayLike,
        progress: entity.serializeProgress!(
          action.payload.progress
        ) as SerializedProgressLike,
        resource: action.payload.resource,
      };
    }
  });
  yield all(sideEffects);
  if (serialized) {
    yield call(api.dodays.mutations.createAndTakeDodayMutation, serialized);
  }
  yield put(builderActions.clearBuilderActionCreator());
  yield put(
    toastActions.openToastActionCreator({
      open: true,
      messages: ['Your new Activity created!'],
    })
  );
  yield put(sidebarActions.setSidebarLoadingStateActionCreator(false));
}

/**
 * Take Doday - create Progress node and connect to Hero
 *
 * @param {TakeDodayAction} action
 */
export function* takeDodayActionSaga(action: TakeDodayAction) {
  yield put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(true));
  const tools = yield select(activeToolsSelector);
  const sideEffects: SimpleEffect<'PUT', PutEffectDescriptor<any>>[] = [];
  let serialized: SerializedProgressLike | undefined;
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity =
      tool.config.entities &&
      tool.config.entities.find(
        entity => entity.type === action.payload.doday.type
      );
    if (entity) {
      sideEffects.push(
        put(
          tool.actions &&
            tool.actions.optimisticUpdatesActionCreators.takeDodayOptimisticUpdateActionCreator(
              {
                doday: action.payload.doday,
                progress: action.payload.progress,
              }
            )
        )
      );
      /** Serialize payload to update doday in graph (in app we use deserialized dodays) */
      serialized = entity.serializeProgress!(action.payload.progress);
    }
  });
  /** Store side effect */
  sideEffects.push(
    put(
      storeActions.optimisticRemovePublicDodayActionCreator(
        action.payload.doday.did
      )
    )
  );
  /** Clear selected doday, because we are close details */
  yield put(dodayDetailsActions.updateSelectedDodayActionCreator(undefined));
  yield all(sideEffects);
  if (serialized) {
    yield call(api.dodays.mutations.takeDodayMutation, {
      did: action.payload.doday.did,
      progress: serialized,
    });
  }
  yield put(
    toastActions.openToastActionCreator({
      open: true,
      messages: ['Taken!'],
    })
  );
  yield put(
    dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(false)
  );
}

/**
 * Delete Doday - delete Doday and all related nodes from graph
 *
 * @param {DeleteDodayAction} action
 */
export function* deleteDodayActionSaga(action: DeleteDodayAction) {
  yield put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(true));
  const tools = yield select(activeToolsSelector);
  const sideEffects: SimpleEffect<'PUT', PutEffectDescriptor<any>>[] = [];
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity =
      tool.config.entities &&
      tool.config.entities.find(entity => entity.type === action.payload.type);
    if (entity) {
      sideEffects.push(
        put(
          tool.actions &&
            tool.actions.optimisticUpdatesActionCreators.deleteDodayOptimisticUpdateActionCreator(
              action.payload.did
            )
        )
      );
    }
  });
  yield all(sideEffects);
  yield call(api.dodays.mutations.deleteDodayMutation, action.payload.did);
  yield put(
    toastActions.openToastActionCreator({
      open: true,
      messages: ['Your doday is deleted!'],
    })
  );
  yield put(
    dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(false)
  );
}

/**
 * UnTake Doday - remove Progress node and relations to Hero
 *
 * @param {UnTakeDodayAction} action
 */
export function* unTakeDodayActionSaga(action: UntakeDodayAction) {
  yield put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(true));
  const tools = yield select(activeToolsSelector);
  const term = yield select(searchTerm);
  const dodays = yield select(publicDodays);
  const sideEffects: SimpleEffect<'PUT', PutEffectDescriptor<any>>[] = [];
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity =
      tool.config.entities &&
      tool.config.entities.find(entity => entity.type === action.payload.type);
    if (entity) {
      sideEffects.push(
        put(
          tool.actions &&
            tool.actions.optimisticUpdatesActionCreators.untakeDodayOptimisticUpdateActionCreator(
              action.payload.did
            )
        )
      );
    }
  });
  /** Clear selected doday, because we are close details */
  yield put(dodayDetailsActions.updateSelectedDodayActionCreator(undefined));
  yield all(sideEffects);
  yield call(api.dodays.mutations.untakeDodayMutation, action.payload.did);
  /**
   * Refetch public dodays for store
   * When you untake doday - it appears in Store again
   */
  yield term
    ? put(
        storeActions.searchPublicDodaysForStoreActionCreator({
          term,
          limit: dodays.length + 1,
        })
      )
    : put(
        storeActions.fetchPublicDodaysForStoreActionCreator({
          limit: dodays.length + 1,
        })
      );
  yield put(
    toastActions.openToastActionCreator({
      open: true,
      messages: ['Untaken!'],
    })
  );
  yield put(
    dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(false)
  );
}

/**
 * Update doday saga
 *
 * @param {UpdateDodayAction} action
 */
export function* updateDodayActionSaga(action: UpdateDodayAction) {
  yield put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(true));
  const tools = yield select(activeToolsSelector);
  const selected = yield select(selectedDodaySelector);
  const sideEffects: SimpleEffect<'PUT', PutEffectDescriptor<any>>[] = [];
  let serialized:
    | {
        doday: Partial<SerializedDodayLike>;
        progress: Partial<SerializedProgressLike>;
        resource: Partial<Resource> | undefined;
      }
    | undefined;
  /**
   * Collect all sideeffects from active tools
   * related to this action
   */
  tools.map((tool: ToolBeacon) => {
    const entity =
      tool.config.entities &&
      tool.config.entities.find(entity => entity.type === action.payload.type);
    if (entity) {
      sideEffects.push(
        /** Deserialize payload to update doday in store (in app we use deserialized dodays) */
        put(
          tool.actions &&
            tool.actions.optimisticUpdatesActionCreators.updateDodayOptimisticUpdateActionCreator(
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
            dodayDetailsActions.updateSelectedDodayActionCreator({
              progress: action.payload.updates.progress,
            })
          )
        );
      }
      serialized = {
        doday: entity.serialize!(
          action.payload.updates.doday!
        ) as SerializedActivity,
        progress: entity.serializeProgress!(
          action.payload.updates.progress!
        ) as SerializedActivityProgress,
        resource: action.payload.updates.resource,
      };
    }
  });
  yield all(sideEffects);
  if (serialized) {
    yield call(api.dodays.mutations.updateDodayMutation, {
      did: action.payload.did,
      updates: serialized,
    });
  }
  yield put(dodayDetailsActions.clearDodayDetailsDirtyStuffActionCreator());
  yield put(
    dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(false)
  );
}

export default [
  takeLatest(APIActionConstants.CREATE_DODAY, createDodayActionSaga),
  takeLatest(
    APIActionConstants.CREATE_AND_TAKE_DODAY,
    createAndTakeDodayActionSaga
  ),
  takeLatest(APIActionConstants.TAKE_DODAY, takeDodayActionSaga),
  takeLatest(APIActionConstants.UPDATE_DODAY, updateDodayActionSaga),
  takeLatest(APIActionConstants.DELETE_DODAY, deleteDodayActionSaga),
  takeLatest(APIActionConstants.UNTAKE_DODAY, unTakeDodayActionSaga),
];
