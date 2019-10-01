import actions, {
  CreateDodayAction,
  CreateAndTakeDodayAction,
  TakeDodayAction,
  UpdateDodayAction,
  UntakeDodayAction,
  DeleteDodayAction,
  APIActionConstants,
} from '../actions';
import {
  DodayType,
  deserializedActivity,
  deserializedResource,
  deserialzedActivityProgress,
  doday,
  partialProgress,
} from '@doday/lib';

describe('test api action creators', () => {
  it('createDodayActionCreator', () => {
    const newDoday = {
      doday: deserializedActivity,
      resource: deserializedResource,
    };
    const expectedActionObject: CreateDodayAction = {
      type: APIActionConstants.CREATE_DODAY,
      payload: newDoday,
    };
    expect(actions.createDodayActionCreator(newDoday)).toEqual(
      expectedActionObject
    );
  });

  it('createAndTakeDodayActionCreator', () => {
    const newDoday = {
      doday: deserializedActivity,
      progress: deserialzedActivityProgress,
      resource: deserializedResource,
    };
    const expectedActionObject: CreateAndTakeDodayAction = {
      type: APIActionConstants.CREATE_AND_TAKE_DODAY,
      payload: newDoday,
    };
    expect(actions.createAndTakeDodayActionCreator(newDoday)).toEqual(
      expectedActionObject
    );
  });

  it('takeDodayActionCreator', () => {
    const payload = {
      doday: doday,
      progress: deserialzedActivityProgress,
    };
    const expectedActionObject: TakeDodayAction = {
      type: APIActionConstants.TAKE_DODAY,
      payload,
    };
    expect(actions.takeDodayActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });

  it('updateDodayActionCreator update progress', () => {
    const payload = {
      did: 'string',
      type: DodayType.Activity,
      updates: {
        progress: partialProgress,
      },
    };
    const expectedActionObject: UpdateDodayAction = {
      type: APIActionConstants.UPDATE_DODAY,
      payload,
    };
    expect(actions.updateDodayActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });

  it('untakeDodayActionCreator', () => {
    const payload = {
      did: 'string',
      type: DodayType.Activity,
    };
    const expectedActionObject: UntakeDodayAction = {
      type: APIActionConstants.UNTAKE_DODAY,
      payload,
    };
    expect(actions.untakeDodayActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });

  it('deleteDodayActionCreator', () => {
    const payload = {
      did: 'string',
      type: DodayType.Activity,
    };
    const expectedActionObject: DeleteDodayAction = {
      type: APIActionConstants.DELETE_DODAY,
      payload,
    };
    expect(actions.deleteDodayActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });
});
