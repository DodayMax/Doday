import * as duck from '../duck';

export const getActivitiesMainModule = () => ({
  id: 'activities',
  reducerMap: {
    activities: duck.reducers.mainReducer,
  },
  sagas: [duck.sagas.mainSagas],
});

export const getActivitiesBuilderModule = () => ({
  id: 'activities-builder',
  reducerMap: {
    activities: duck.reducers.builderReducer,
  },
  sagas: [duck.sagas.builderSagas],
});
