// Initializes the `item` service on path `/item`
const createService = require('feathers-nedb');
const createModel = require('../../models/item.model');
const hooks = require('./item.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/item', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('item');

  service.hooks(hooks);
};
