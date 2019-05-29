import { connect } from 'react-redux';
import { DodayDialogComponent } from '@shared';
import { RootState } from '@root/lib/models';
import { actionCreators, CloseDialogAction } from '@root/ducks/dialog/actions';

export interface DodayDialogContainerProps {
  open: boolean;
  title: string;
  message?: string;
  actions: React.ReactNode[];
  closeDialog: () => CloseDialogAction;
}

const mapState = (rootState: RootState) => ({
  ...rootState.dialog,
});

export const DodayDialog = connect(
  mapState,
  {
    closeDialog: actionCreators.closeDialogActionCreator,
  }
)(DodayDialogComponent);
