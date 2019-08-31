import reducer from './reducer';
import actions from './actions';
import authSagas from './sagas';

export * from './actions';
export default { actions, sagas: authSagas, reducer };
