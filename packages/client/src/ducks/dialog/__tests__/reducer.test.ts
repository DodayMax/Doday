import reducer, { initialDialogState } from '../reducer';
import { actionCreators } from '../actions';
import { DialogState } from '@root/lib/models';

describe("test toast's reducers", () => {
  it('open reducer', () => {
    const payload: DialogState = {
      open: true,
      title: 'Title',
      message: 'Test message',
      actions: [],
    };
    expect(
      reducer(
        initialDialogState,
        actionCreators.openDialogActionCreator(payload)
      )
    ).toEqual({
      ...initialDialogState,
      payload,
    });
  });

  it('close reducer', () => {
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
      actionCreators.closeDialogActionCreator()
    );
    expect(newState).toEqual(initialDialogState);
  });
});
