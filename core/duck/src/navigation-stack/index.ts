import reducer from './navigation-stack.reducer';
import sidebarSagas from './navigation-stack.sagas';
import actions from './navigation-stack.actions';

export * from './navigation-stack.actions';
export default { actions, sagas: sidebarSagas, reducer };
