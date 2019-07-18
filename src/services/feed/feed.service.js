// Initializes the `feed` service on path `/api/feed`
const createService = require('feathers-nedb');
const createModel = require('../../models/feed.model');
const hooks = require('./feed.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/feed', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/feed');

  service.hooks(hooks);
};
