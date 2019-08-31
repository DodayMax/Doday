import { connect } from 'react-redux';
import { DodayDialogComponent } from '@shared';
import { RootState } from '@root/lib/models';
import { actionCreators, CloseDialogAction } from '@root/ducks/dialog/actions';

const mapState = (rootState: RootState) => ({
  ...rootState.dialog,
});

export const DodayDialog = connect(
  mapState,
  {
    closeDialog: actionCreators.closeDialogActionCreator,
  }
)(DodayDialogComponent);
