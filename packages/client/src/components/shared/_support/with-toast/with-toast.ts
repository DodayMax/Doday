import { connect } from 'react-redux';
import { actionCreators, OpenToastAction } from '@root/ducks/toast/actions';
import { ToastState } from '@root/lib/models';

export type WithToast = {
  openToast: (options: ToastState) => OpenToastAction;
};

export const withToast = WrappedComponent =>
  connect(
    null,
    { openToast: actionCreators.openToastActionCreator }
  )(WrappedComponent);
