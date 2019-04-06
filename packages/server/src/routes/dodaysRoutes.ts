import * as dodayController from '../controllers/dodays';

module.exports = app => {
  app.get('/api/activeDodaysForDate', dodayController.getActiveDodaysForDate);
  app.post('/api/dodays', dodayController.createAndTakeDoday);
};
