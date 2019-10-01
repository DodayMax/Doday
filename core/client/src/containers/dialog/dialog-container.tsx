import { connect } from 'react-redux';
import { DodayDialogComponent } from '@doday/shared';
import { RootState } from '@doday/lib';
import ducks from '@doday/ducks';

const mapState = (rootState: RootState) => ({
  ...rootState.dialog,
});

export const DodayDialog = connect(
  mapState,
  {
    closeDialog: ducks.dialog.actions.closeDialogActionCreator,
  }
)(DodayDialogComponent);
