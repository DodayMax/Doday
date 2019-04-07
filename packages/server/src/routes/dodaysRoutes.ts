import * as dodayController from '../controllers/dodays';

module.exports = app => {
  app.get('/api/activeDodaysForDate', dodayController.getActiveDodaysForDate);
  app.post('/api/dodays', dodayController.createAndTakeDoday);
  app.post('/api/dodays/:did', dodayController.toggleDoday);
  app.delete('/api/dodays/:did', dodayController.deleteDoday);
};
