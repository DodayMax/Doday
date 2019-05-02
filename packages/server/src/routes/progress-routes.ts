import * as progressController from '../controllers/progress';

module.exports = app => {
  /**
   * Get dodays with progress with query params
   *
   * progress: boolean - to get dodays nodes with Progress
   * startdate: number - >= startdate
   * enddate: number - <= enddate
   * completed: boolean - if undefined - both
   */
  app.get('/api/progress', progressController.getDodaysWithProgressController);
};
