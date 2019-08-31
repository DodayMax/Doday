import { connect } from 'react-redux';
import { Snackbar } from '@doday/shared';
import { RootState } from '@doday/lib';
import actions from '@doday/duck';

const mapState = (rootState: RootState) => ({
  ...rootState.toast,
});

export const Toast = connect(
  mapState,
  { onClose: actions.toast.actions.closeToastActionCreator }
)(Snackbar);
