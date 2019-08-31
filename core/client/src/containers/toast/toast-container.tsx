import { connect } from 'react-redux';
import { Snackbar } from '@shared';
import { RootState } from '@root/lib/models';
import { actionCreators } from '@root/ducks/toast/actions';

const mapState = (rootState: RootState) => ({
  ...rootState.toast,
});

export const Toast = connect(
  mapState,
  { onClose: actionCreators.closeToastActionCreator }
)(Snackbar);
