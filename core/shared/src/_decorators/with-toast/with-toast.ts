import { connect } from 'react-redux';
import ducks, { OpenToastAction } from '@doday/duck';
import { ToastState } from '@doday/lib';

export type WithToast = {
  openToast: (options: ToastState) => OpenToastAction;
};

export const withToast = (WrappedComponent: React.ComponentType<any>) =>
  connect(
    null,
    { openToast: ducks.toast.actions.openToastActionCreator }
  )(WrappedComponent);
