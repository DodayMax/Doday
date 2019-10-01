import reducer from './reducer';
import actions from './actions';
import dodayDetailsSagas from './sagas';

export * from './actions';
export default { actions, sagas: dodayDetailsSagas, reducer };
