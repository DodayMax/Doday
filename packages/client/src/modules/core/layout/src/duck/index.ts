import LayoutReducer from './reducer';
import * as actions from './actions';

export { actions, LayoutReducer as reducer };

export const getLayoutModule = () => ({
  id: 'layout',
  reducerMap: {
    layout: LayoutReducer,
  },
  sagas: [],
});
