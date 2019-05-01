import * as activityController from '../controllers/activities';

module.exports = app => {
  /** Create new Activity(Doday) node */
  app.post('/api/activities/create', activityController.createActivity);
  /** Create new Progress node and relations to Activity(Doday) and Hero nodes */
  app.post('/api/activities/:did', activityController.takeActivity);
  /** Create both Activity(Doday) node and Progress node and relations */
  app.post('/api/activities', activityController.createAndTakeActivity);

  /** Update props of the Activity(Doday) node */
  app.put('/api/activities/:did', activityController.updateActivity);

  /** Delete Activity(Doday) node and it's relations */
  app.delete('/api/activities/delete/:did', activityController.deleteActivity);
  /** Delete Progress node and it's relations, but don't touch Activity(Doday) node itself */
  app.delete('/api/activities/remove/:did', activityController.removeActivity);
};
