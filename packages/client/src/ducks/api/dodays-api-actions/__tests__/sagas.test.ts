import {
  CreateDodayAction,
  ActionConstants,
  CreateAndTakeDodayAction,
  TakeDodayAction,
  DeleteDodayAction,
  UntakeDodayAction,
  UpdateDodayAction,
} from '../actions';
import {
  deserializedActivity,
  rootState,
  deserializedResource,
  deserialzedActivityProgress,
  partialProgress,
} from '@root/lib/common-interfaces/fake-data';
import {
  createDodayActionSaga,
  createAndTakeDodayActionSaga,
  takeDodayActionSaga,
  deleteDodayActionSaga,
  unTakeDodayActionSaga,
  updateDodayActionSaga,
} from '../sagas';
import { setDodayAppLoadingStateActionCreator } from '@root/ducks/doday-app/actions';
import { put, select, all, call } from 'redux-saga/effects';
import { activeTools } from '@root/ducks/auth/selectors';
import { api } from '@root/services';
import { selectedDoday } from '@root/ducks/doday-details/selectors';
import {
  setDodayDetailsLoadingStateActionCreator,
  updateSelectedDodayActionCreator,
  clearDodayDetailsDirtyStuffActionCreator,
} from '@root/ducks/doday-details/actions';
import { clearBuilderActionCreator } from '@root/ducks/builder/actions';
import { openToastActionCreator } from '@root/ducks/toast/actions';
import {
  SerializedDodayLike,
  SerializedProgressLike,
  DodayType,
} from '@root/lib/models/entities/common';

describe('Test api sagas', () => {
  it('createDodayActionSaga with valid entity', () => {
    const action: CreateDodayAction = {
      type: ActionConstants.CREATE_DODAY,
      payload: {
        doday: deserializedActivity,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const sideEffects = [
      put(
        activeTool[0].duck.actions.optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
          {
            doday: action.payload.doday,
            resource: action.payload.resource,
          }
        )
      ),
    ];
    const serialized = {
      doday: activeTool[0].config.entities[0].serialize(
        action.payload.doday
      ) as SerializedDodayLike,
      resource: action.payload.resource,
    };
    const gen = createDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(setDodayAppLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeTools));
    expect(gen.next(activeTool).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.createDodayMutation, serialized)
    );
    expect(gen.next().value).toEqual(put(clearBuilderActionCreator()));
    expect(gen.next().value).toEqual(
      put(
        openToastActionCreator({
          open: true,
          messages: ['Your new Activity created!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(setDodayAppLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('createAndTakeDodayActionSaga with valid entity', () => {
    const action: CreateAndTakeDodayAction = {
      type: ActionConstants.CREATE_AND_TAKE_DODAY,
      payload: {
        doday: deserializedActivity,
        progress: deserialzedActivityProgress,
        resource: deserializedResource,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const sideEffects = [
      put(
        activeTool[0].duck.actions.optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
          {
            doday: action.payload.doday,
            progress: action.payload.progress,
            resource: action.payload.resource,
          }
        )
      ),
    ];
    const serialized = {
      doday: activeTool[0].config.entities[0].serialize(
        action.payload.doday
      ) as SerializedDodayLike,
      progress: activeTool[0].config.entities[0].serializeProgress(
        action.payload.progress
      ) as SerializedProgressLike,
      resource: action.payload.resource,
    };
    const gen = createAndTakeDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(setDodayAppLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeTools));
    expect(gen.next(activeTool).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.createAndTakeDodayMutation, serialized)
    );
    expect(gen.next().value).toEqual(put(clearBuilderActionCreator()));
    expect(gen.next().value).toEqual(
      put(
        openToastActionCreator({
          open: true,
          messages: ['Your new Activity created!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(setDodayAppLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('takeDodayActionSaga updated doday not selected in details', () => {
    const action: TakeDodayAction = {
      type: ActionConstants.TAKE_DODAY,
      payload: {
        did: 'did',
        type: DodayType.Activity,
        progress: deserialzedActivityProgress,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const selected = deserializedActivity;
    const sideEffects = [
      put(
        activeTool[0].duck.actions.optimisticUpdatesActionCreators.takeDodayOptimisticUpdateActionCreator(
          {
            did: action.payload.did,
            progress: action.payload.progress,
          }
        )
      ),
    ];
    const serialized = activeTool[0].config.entities[0].serializeProgress(
      action.payload.progress
    );
    const gen = takeDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeTools));
    expect(gen.next(activeTool).value).toEqual(select(selectedDoday));
    expect(gen.next(selected).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.takeDodayMutation, {
        did: action.payload.did,
        progress: serialized,
      })
    );
    expect(gen.next().value).toEqual(
      put(
        openToastActionCreator({
          open: true,
          messages: ['Taken!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('takeDodayActionSaga updated doday is selected in details', () => {
    const action: TakeDodayAction = {
      type: ActionConstants.TAKE_DODAY,
      payload: {
        did: deserializedActivity.did,
        type: DodayType.Activity,
        progress: deserialzedActivityProgress,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const selected = deserializedActivity;
    const sideEffects = [
      put(
        activeTool[0].duck.actions.optimisticUpdatesActionCreators.takeDodayOptimisticUpdateActionCreator(
          {
            did: action.payload.did,
            progress: action.payload.progress,
          }
        )
      ),
      put(
        updateSelectedDodayActionCreator({
          progress: action.payload.progress,
        })
      ),
    ];
    const serialized = activeTool[0].config.entities[0].serializeProgress(
      action.payload.progress
    );
    const gen = takeDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeTools));
    expect(gen.next(activeTool).value).toEqual(select(selectedDoday));
    expect(gen.next(selected).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.takeDodayMutation, {
        did: action.payload.did,
        progress: serialized,
      })
    );
    expect(gen.next().value).toEqual(
      put(
        openToastActionCreator({
          open: true,
          messages: ['Taken!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('deleteDodayActionSaga', () => {
    const action: DeleteDodayAction = {
      type: ActionConstants.DELETE_DODAY,
      payload: {
        did: deserializedActivity.did,
        type: DodayType.Activity,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const sideEffects = [
      put(
        activeTool[0].duck.actions.optimisticUpdatesActionCreators.deleteDodayOptimisticUpdateActionCreator(
          action.payload.did
        )
      ),
    ];
    const gen = deleteDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeTools));
    expect(gen.next(activeTool).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.deleteDodayMutation, action.payload.did)
    );
    expect(gen.next().value).toEqual(
      put(
        openToastActionCreator({
          open: true,
          messages: ['Your doday is deleted!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('unTakeDodayActionSaga updated doday is selected in details', () => {
    const action: UntakeDodayAction = {
      type: ActionConstants.UNTAKE_DODAY,
      payload: {
        did: deserializedActivity.did,
        type: DodayType.Activity,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const selected = deserializedActivity;
    const sideEffects = [
      put(
        activeTool[0].duck.actions.optimisticUpdatesActionCreators.untakeDodayOptimisticUpdateActionCreator(
          action.payload.did
        )
      ),
    ];
    const gen = unTakeDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeTools));
    expect(gen.next(activeTool).value).toEqual(select(selectedDoday));
    expect(gen.next(selected).value).toEqual(
      put(updateSelectedDodayActionCreator(undefined))
    );
    expect(gen.next().value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.untakeDodayMutation, action.payload.did)
    );
    expect(gen.next().value).toEqual(
      put(
        openToastActionCreator({
          open: true,
          messages: ['Untaken!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('unTakeDodayActionSaga updated doday isnt selected in details', () => {
    const action: UntakeDodayAction = {
      type: ActionConstants.UNTAKE_DODAY,
      payload: {
        did: 'did',
        type: DodayType.Activity,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const selected = deserializedActivity;
    const sideEffects = [
      put(
        activeTool[0].duck.actions.optimisticUpdatesActionCreators.untakeDodayOptimisticUpdateActionCreator(
          action.payload.did
        )
      ),
    ];
    const gen = unTakeDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeTools));
    expect(gen.next(activeTool).value).toEqual(select(selectedDoday));
    expect(gen.next(selected).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.untakeDodayMutation, action.payload.did)
    );
    expect(gen.next().value).toEqual(
      put(
        openToastActionCreator({
          open: true,
          messages: ['Untaken!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('updateDodayActionSaga updated doday is selected in details', () => {
    const action: UpdateDodayAction = {
      type: ActionConstants.UPDATE_DODAY,
      payload: {
        did: deserializedActivity.did,
        type: DodayType.Activity,
        updates: {
          progress: partialProgress,
        },
      },
    };
    const activeTool = rootState.auth.activeTools;
    const selected = deserializedActivity;
    const serialized = {
      doday: activeTool[0].config.entities[0].serialize(
        action.payload.updates.doday
      ),
      progress: activeTool[0].config.entities[0].serializeProgress(
        action.payload.updates.progress
      ),
      resource: action.payload.updates.resource,
    };
    const sideEffects = [
      put(
        activeTool[0].duck.actions.optimisticUpdatesActionCreators.updateDodayOptimisticUpdateActionCreator(
          {
            did: action.payload.did,
            updates: {
              doday: action.payload.updates.doday,
              progress: action.payload.updates.progress,
            },
          }
        )
      ),
      put(
        updateSelectedDodayActionCreator({
          progress: action.payload.updates.progress,
        })
      ),
    ];
    const gen = updateDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeTools));
    expect(gen.next(activeTool).value).toEqual(select(selectedDoday));
    expect(gen.next(selected).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.updateDodayMutation, {
        did: action.payload.did,
        updates: serialized,
      })
    );
    expect(gen.next().value).toEqual(
      put(clearDodayDetailsDirtyStuffActionCreator())
    );
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('updateDodayActionSaga updated doday isnt selected in details', () => {
    const action: UpdateDodayAction = {
      type: ActionConstants.UPDATE_DODAY,
      payload: {
        did: 'some did',
        type: DodayType.Activity,
        updates: {
          progress: partialProgress,
        },
      },
    };
    const activeTool = rootState.auth.activeTools;
    const selected = deserializedActivity;
    const serialized = {
      doday: activeTool[0].config.entities[0].serialize(
        action.payload.updates.doday
      ),
      progress: activeTool[0].config.entities[0].serializeProgress(
        action.payload.updates.progress
      ),
      resource: action.payload.updates.resource,
    };
    const sideEffects = [
      put(
        activeTool[0].duck.actions.optimisticUpdatesActionCreators.updateDodayOptimisticUpdateActionCreator(
          {
            did: action.payload.did,
            updates: {
              doday: action.payload.updates.doday,
              progress: action.payload.updates.progress,
            },
          }
        )
      ),
    ];
    const gen = updateDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeTools));
    expect(gen.next(activeTool).value).toEqual(select(selectedDoday));
    expect(gen.next(selected).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.updateDodayMutation, {
        did: action.payload.did,
        updates: serialized,
      })
    );
    expect(gen.next().value).toEqual(
      put(clearDodayDetailsDirtyStuffActionCreator())
    );
    expect(gen.next().value).toEqual(
      put(setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });
});
