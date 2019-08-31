import reducer, { initialDialogState } from '../reducer';
import actions from '../actions';
import { DialogState } from '@doday/lib';

describe("test dialog's reducers", () => {
  it('open dialog reducer', () => {
    const payload: DialogState = {
      open: true,
      title: 'Title',
      message: 'Test message',
      actions: [],
    };
    expect(
      reducer(initialDialogState, actions.openDialogActionCreator(payload))
    ).toEqual({
      ...initialDialogState,
      ...payload,
    });
  });

  it('close dialog reducer', () => {
    const testState: DialogState = {
      open: true,
      title: 'Title',
      message: 'Test message',
      actions: [],
    };
    const newState = reducer(
      {
        ...initialDialogState,
        ...testState,
      },
      actions.closeDialogActionCreator()
    );
    expect(newState).toEqual(initialDialogState);
  });
});
