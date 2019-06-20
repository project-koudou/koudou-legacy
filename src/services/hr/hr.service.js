// Initializes the `hr` service on path `/api/hr`
const createService = require('feathers-nedb');
const createModel = require('../../models/hr.model');
const hooks = require('./hr.hooks');
const definitions = require('./hr.definitions');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  const hr = createService(options);
  hr.id = "_id";
  hr.docs = definitions;
  app.use('/api/hr', hr);

  // Get our initialized service so that we can register hooks
  const service = app.service('api/hr');

  service.hooks(hooks);
};
