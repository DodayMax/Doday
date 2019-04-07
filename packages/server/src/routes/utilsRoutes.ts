import * as utilsController from '../controllers/utils';

module.exports = app => {
  app.get('/api/utils/parse', utilsController.parseUrlMetadata);
};
