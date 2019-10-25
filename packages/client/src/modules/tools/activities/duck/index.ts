import * as reducers from './reducer';
import * as actions from './actions';
import * as sagas from './sagas';

export { actions, sagas, reducers };

export const getActivitiesMainModule = () => ({
  id: 'activities',
  reducerMap: {
    activities: reducers.mainReducer,
  },
  sagas: [sagas.mainSagas],
});

export const getActivitiesBuilderModule = () => ({
  id: 'activities-builder',
  reducerMap: {
    activities: reducers.builderReducer,
  },
  sagas: [sagas.builderSagas],
});
