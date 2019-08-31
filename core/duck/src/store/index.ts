import reducer from './reducer';
import actions from './actions';
import storeSagas from './sagas';

export * from './actions';
export default { actions, sagas: storeSagas, reducer };
