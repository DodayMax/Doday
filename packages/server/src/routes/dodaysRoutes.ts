import * as dodayController from '../controllers/dodays';

module.exports = app => {
  app.post('/api/dodays', dodayController.createAndTakeDoday);
};
