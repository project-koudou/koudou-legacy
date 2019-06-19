// Initializes the `hr` service on path `/hr`
const createService = require('feathers-nedb');
const createModel = require('../../models/hr.model');
const hooks = require('./hr.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/hr', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('hr');

  service.hooks(hooks);
};
