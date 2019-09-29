import reducer from './reducer';
import sidebarSagas from './sagas';
import actions from './actions';

export * from './actions';
export default { actions, sagas: sidebarSagas, reducer };
