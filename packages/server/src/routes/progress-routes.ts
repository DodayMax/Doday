import * as progressController from '../controllers/progress';

module.exports = app => {
  /**
   * Get dodays with progress with query params
   *
   * dodaytype: number - get Progress only for dodays with passed DodayType
   *  0 - Activity
   *  1 - FlashCard
   * startdate: number - >= startdate
   * enddate: number - <= enddate
   * completed: boolean - if undefined - both
   */
  app.get('/api/progress', progressController.getDodaysWithProgressController);
};
