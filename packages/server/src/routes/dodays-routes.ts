import * as dodaysController from '../controllers/dodays';

module.exports = app => {
  /**
   * Get dodays with query params
   * Query params:
   *
   * type: number - only dodays with passed DodayType
   *  0 - Activity
   *  1 - FlashCard
   * createdBy: DID(string) - created by Hero with passed DID
   */
  app.get('/api/dodays', dodaysController.getDodaysController);
  /** Get doday by did */
  app.get(
    '/api/dodays/:did',
    dodaysController.getDodaysWithProgressByDIDController
  );

  /**
   * Create new Doday node
   * Query params:
   *
   * take=true - to create both Doday node and Progress node and relations
   */
  app.post('/api/dodays', dodaysController.createAndTakeDodayController);

  /** Update props of the Doday node */
  app.put('/api/dodays/:did', dodaysController.updateDodayController);

  /** Create new Progress node and relations to Doday and Hero nodes */
  app.post('/api/dodays/:did/take', dodaysController.takeDodayController);
  /** Delete Doday node and it's relations */
  app.delete('/api/dodays/:did/delete', dodaysController.deleteDodayController);
  /** Delete Progress node and it's relations, but don't touch Doday node itself */
  app.delete('/api/dodays/:did/untake', dodaysController.removeDodayController);
};
