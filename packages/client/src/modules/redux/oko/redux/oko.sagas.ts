import { all, call, takeEvery } from 'redux-saga/effects';
import { OKOActionConstants, SetActiveModuleAction } from './oko.actions';

export function* setActiveModuleSaga(action: SetActiveModuleAction) {
  yield call(console.log, 'set active');
}

export default function* runModuleNameSagas() {
  yield all([
    takeEvery(OKOActionConstants.SET_ACTIVE_MODULE, setActiveModuleSaga),
  ]);
}
