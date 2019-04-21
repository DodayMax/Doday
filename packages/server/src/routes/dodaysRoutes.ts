import * as dodayController from '../controllers/dodays';

module.exports = app => {
  app.get('/api/dodays/active', dodayController.getActiveDodays);
  app.get('/api/dodays/public', dodayController.getPublicDodays);
  app.post('/api/dodays', dodayController.createAndTakeDoday);
  app.post('/api/dodays/create', dodayController.create);
  // app.post('/api/dodays/take', dodayController.take);
  app.get('/api/dodays/:did', dodayController.getDodayByDID);
  app.post('/api/dodays/:did', dodayController.toggleDoday);
  app.put('/api/dodays/:did', dodayController.updateDoday);
  app.delete('/api/dodays/delete/:did', dodayController.deleteDoday);
  app.delete('/api/dodays/remove/:did', dodayController.removeDoday);
};
