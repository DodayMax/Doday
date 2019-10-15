import api from '@doday/api';
import {
  CreateDodayAction,
  APIActionConstants,
  CreateAndTakeDodayAction,
  TakeDodayAction,
  DeleteDodayAction,
  UntakeDodayAction,
  UpdateDodayAction,
} from '../actions';
import {
  createDodayActionSaga,
  createAndTakeDodayActionSaga,
  takeDodayActionSaga,
  deleteDodayActionSaga,
  unTakeDodayActionSaga,
  updateDodayActionSaga,
} from '../sagas';
import { put, select, all, call } from 'redux-saga/effects';
import {
  deserializedActivity,
  SerializedDodayLike,
  deserialzedActivityProgress,
  deserializedResource,
  SerializedProgressLike,
  doday,
  NodeType,
  partialProgress,
  rootState,
  Activity,
  ActivityProgress,
} from '@doday/lib';
import storeActions from '../../store/actions';
import sidebarActions from '../../sidebar/actions';
import builderActions from '../../builder/actions';
import toastActions from '../../toast/actions';
import dodayDetailsActions from '../../doday-details/actions';
import { activeToolsSelector } from '../../auth/selectors';
import { searchTerm, publicDodays } from '../../store/selectors';
import { selectedDodaySelector } from '../../doday-details/selectors';

describe('Test api sagas', () => {
  it('createDodayActionSaga with valid entity', () => {
    const action: CreateDodayAction = {
      type: APIActionConstants.CREATE_DODAY,
      payload: {
        doday: deserializedActivity,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const sideEffects = [
      put(
        activeTool[0] &&
          activeTool[0].actions &&
          activeTool[0].actions.optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
            {
              doday: action.payload.doday,
              resource: action.payload.resource,
            }
          )
      ),
    ];
    const serialized = {
      doday:
        activeTool[0].config &&
        (activeTool[0].config.entities &&
          (activeTool[0].config.entities[0].serialize!(
            action.payload.doday
          ) as SerializedDodayLike)),
      resource: action.payload.resource,
    };
    const gen = createDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(sidebarActions.setSidebarLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeToolsSelector));
    expect(gen.next(activeTool).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.createDodayMutation, serialized as any)
    );
    expect(gen.next().value).toEqual(
      put(builderActions.clearBuilderActionCreator())
    );
    expect(gen.next().value).toEqual(
      put(
        toastActions.openToastActionCreator({
          open: true,
          messages: ['Your new Activity created!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(sidebarActions.setSidebarLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('createAndTakeDodayActionSaga with valid entity', () => {
    const action: CreateAndTakeDodayAction = {
      type: APIActionConstants.CREATE_AND_TAKE_DODAY,
      payload: {
        doday: deserializedActivity,
        progress: deserialzedActivityProgress,
        resource: deserializedResource,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const sideEffects = [
      put(
        activeTool[0].actions &&
          activeTool[0].actions.optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
            {
              doday: action.payload.doday,
              progress: action.payload.progress,
              resource: action.payload.resource,
            }
          )
      ),
    ];
    const serialized = {
      doday:
        activeTool[0].config.entities &&
        (activeTool[0].config.entities[0].serialize!(
          action.payload.doday
        ) as SerializedDodayLike),
      progress:
        activeTool[0].config.entities &&
        (activeTool[0].config.entities[0].serializeProgress!(
          action.payload.progress
        ) as SerializedProgressLike),
      resource: action.payload.resource,
    };
    const gen = createAndTakeDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(sidebarActions.setSidebarLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeToolsSelector));
    expect(gen.next(activeTool).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.createAndTakeDodayMutation, serialized as any)
    );
    expect(gen.next().value).toEqual(
      put(builderActions.clearBuilderActionCreator())
    );
    expect(gen.next().value).toEqual(
      put(
        toastActions.openToastActionCreator({
          open: true,
          messages: ['Your new Activity created!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(sidebarActions.setSidebarLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('takeDodayActionSaga updated doday', () => {
    const action: TakeDodayAction = {
      type: APIActionConstants.TAKE_DODAY,
      payload: {
        doday,
        progress: deserialzedActivityProgress,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const sideEffects = [
      put(
        activeTool[0].actions &&
          activeTool[0].actions.optimisticUpdatesActionCreators.takeDodayOptimisticUpdateActionCreator(
            {
              doday,
              progress: action.payload.progress,
            }
          )
      ),
      put(
        storeActions.optimisticRemovePublicDodayActionCreator(
          action.payload.doday.did
        )
      ),
    ];
    const serialized =
      activeTool[0].config.entities &&
      activeTool[0].config.entities[0].serializeProgress!(
        action.payload.progress
      );
    const gen = takeDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeToolsSelector));
    expect(gen.next(activeTool).value).toEqual(
      put(dodayDetailsActions.updateSelectedDodayActionCreator(undefined))
    );
    expect(gen.next().value).toEqual(all(sideEffects));
    if (serialized) {
      expect(gen.next().value).toEqual(
        call(api.dodays.mutations.takeDodayMutation, {
          did: action.payload.doday.did,
          progress: serialized,
        })
      );
    }
    expect(gen.next().value).toEqual(
      put(
        toastActions.openToastActionCreator({
          open: true,
          messages: ['Taken!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('deleteDodayActionSaga', () => {
    const action: DeleteDodayAction = {
      type: APIActionConstants.DELETE_DODAY,
      payload: {
        did: deserializedActivity.did,
        type: NodeType.Activity,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const sideEffects = [
      put(
        activeTool[0].actions &&
          activeTool[0].actions.optimisticUpdatesActionCreators.deleteDodayOptimisticUpdateActionCreator(
            action.payload.did
          )
      ),
    ];
    const gen = deleteDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeToolsSelector));
    expect(gen.next(activeTool).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.deleteDodayMutation, action.payload.did)
    );
    expect(gen.next().value).toEqual(
      put(
        toastActions.openToastActionCreator({
          open: true,
          messages: ['Your doday is deleted!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('unTakeDodayActionSaga updated doday is selected in details', () => {
    const action: UntakeDodayAction = {
      type: APIActionConstants.UNTAKE_DODAY,
      payload: {
        did: deserializedActivity.did,
        type: NodeType.Activity,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const selected = deserializedActivity;
    const term = 'term';
    const dodays = [doday];
    const sideEffects = [
      put(
        activeTool[0].actions &&
          activeTool[0].actions.optimisticUpdatesActionCreators.untakeDodayOptimisticUpdateActionCreator(
            action.payload.did
          )
      ),
    ];
    const gen = unTakeDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeToolsSelector));
    expect(gen.next(activeTool).value).toEqual(select(selectedDodaySelector));
    expect(gen.next(selected).value).toEqual(select(searchTerm));
    expect(gen.next(term).value).toEqual(select(publicDodays));
    expect(gen.next(dodays).value).toEqual(
      put(dodayDetailsActions.updateSelectedDodayActionCreator(undefined))
    );
    expect(gen.next().value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.untakeDodayMutation, action.payload.did)
    );
    expect(gen.next().value).toEqual(
      put(
        storeActions.searchPublicDodaysForStoreActionCreator({
          term,
          limit: dodays.length + 1,
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(
        toastActions.openToastActionCreator({
          open: true,
          messages: ['Untaken!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('unTakeDodayActionSaga updated doday isnt selected in details', () => {
    const action: UntakeDodayAction = {
      type: APIActionConstants.UNTAKE_DODAY,
      payload: {
        did: 'did',
        type: NodeType.Activity,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const selected = deserializedActivity;
    const term = 'term';
    const dodays = [doday];
    const sideEffects = [
      put(
        activeTool[0].actions &&
          activeTool[0].actions.optimisticUpdatesActionCreators.untakeDodayOptimisticUpdateActionCreator(
            action.payload.did
          )
      ),
    ];
    const gen = unTakeDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeToolsSelector));
    expect(gen.next(activeTool).value).toEqual(select(selectedDodaySelector));
    expect(gen.next(selected).value).toEqual(select(searchTerm));
    expect(gen.next(term).value).toEqual(select(publicDodays));
    expect(gen.next(dodays).value).toEqual(
      put(dodayDetailsActions.updateSelectedDodayActionCreator(undefined))
    );
    expect(gen.next().value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.untakeDodayMutation, action.payload.did)
    );
    expect(gen.next().value).toEqual(
      put(
        storeActions.searchPublicDodaysForStoreActionCreator({
          term,
          limit: dodays.length + 1,
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(
        toastActions.openToastActionCreator({
          open: true,
          messages: ['Untaken!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('unTakeDodayActionSaga without search term and isnt selected', () => {
    const action: UntakeDodayAction = {
      type: APIActionConstants.UNTAKE_DODAY,
      payload: {
        did: 'did',
        type: NodeType.Activity,
      },
    };
    const activeTool = rootState.auth.activeTools;
    const selected = deserializedActivity;
    const dodays = [doday];
    const sideEffects = [
      put(
        activeTool[0].actions &&
          activeTool[0].actions.optimisticUpdatesActionCreators.untakeDodayOptimisticUpdateActionCreator(
            action.payload.did
          )
      ),
    ];
    const gen = unTakeDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeToolsSelector));
    expect(gen.next(activeTool).value).toEqual(select(selectedDodaySelector));
    expect(gen.next(selected).value).toEqual(select(searchTerm));
    expect(gen.next(undefined).value).toEqual(select(publicDodays));
    expect(gen.next(dodays).value).toEqual(
      put(dodayDetailsActions.updateSelectedDodayActionCreator(undefined))
    );
    expect(gen.next().value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.untakeDodayMutation, action.payload.did)
    );
    expect(gen.next().value).toEqual(
      put(
        storeActions.fetchPublicDodaysForStoreActionCreator({
          limit: dodays.length + 1,
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(
        toastActions.openToastActionCreator({
          open: true,
          messages: ['Untaken!'],
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('updateDodayActionSaga updated doday is selected in details', () => {
    const action: UpdateDodayAction = {
      type: APIActionConstants.UPDATE_DODAY,
      payload: {
        did: deserializedActivity.did,
        type: NodeType.Activity,
        updates: {
          progress: partialProgress,
        },
      },
    };
    const activeTool = rootState.auth.activeTools;
    const selected = deserializedActivity;
    const serialized = {
      doday:
        activeTool[0].config.entities &&
        activeTool[0].config.entities[0].serialize!(action.payload.updates
          .doday as Partial<Activity>),
      progress:
        activeTool[0].config.entities &&
        activeTool[0].config.entities[0].serializeProgress!(action.payload
          .updates.progress as Partial<ActivityProgress>),
      resource: action.payload.updates.resource,
    };
    const sideEffects = [
      put(
        activeTool[0].actions &&
          activeTool[0].actions.optimisticUpdatesActionCreators.updateDodayOptimisticUpdateActionCreator(
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
        dodayDetailsActions.updateSelectedDodayActionCreator({
          progress: action.payload.updates.progress,
        })
      ),
    ];
    const gen = updateDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeToolsSelector));
    expect(gen.next(activeTool).value).toEqual(select(selectedDodaySelector));
    expect(gen.next(selected).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.updateDodayMutation, {
        did: action.payload.did,
        updates: serialized,
      })
    );
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.clearDodayDetailsDirtyStuffActionCreator())
    );
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });

  it('updateDodayActionSaga updated doday isnt selected in details', () => {
    const action: UpdateDodayAction = {
      type: APIActionConstants.UPDATE_DODAY,
      payload: {
        did: 'some did',
        type: NodeType.Activity,
        updates: {
          progress: partialProgress,
        },
      },
    };
    const activeTool = rootState.auth.activeTools;
    const selected = deserializedActivity;
    const serialized = {
      doday:
        activeTool[0].config.entities &&
        activeTool[0].config.entities[0].serialize!(action.payload.updates
          .doday as Partial<Activity>),
      progress:
        activeTool[0].config.entities &&
        activeTool[0].config.entities[0].serializeProgress!(action.payload
          .updates.progress as Partial<ActivityProgress>),
      resource: action.payload.updates.resource,
    };
    const sideEffects = [
      put(
        activeTool[0].actions &&
          activeTool[0].actions.optimisticUpdatesActionCreators.updateDodayOptimisticUpdateActionCreator(
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
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(true))
    );
    expect(gen.next().value).toEqual(select(activeToolsSelector));
    expect(gen.next(activeTool).value).toEqual(select(selectedDodaySelector));
    expect(gen.next(selected).value).toEqual(all(sideEffects));
    expect(gen.next().value).toEqual(
      call(api.dodays.mutations.updateDodayMutation, {
        did: action.payload.did,
        updates: serialized,
      })
    );
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.clearDodayDetailsDirtyStuffActionCreator())
    );
    expect(gen.next().value).toEqual(
      put(dodayDetailsActions.setDodayDetailsLoadingStateActionCreator(false))
    );
    expect(gen.next().done).toBe(true);
  });
});
