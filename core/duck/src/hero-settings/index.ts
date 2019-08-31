import reducer from './reducer';
import herosettingsSagas from './sagas';
import actions from './actions';

export * from './actions';
export default {
  actions,
  sagas: herosettingsSagas,
  reducer,
};
